import { Request, Response } from 'express'
import pool from '../db/index'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY as string })

export const getAIRecommendations = async (req: Request, res: Response): Promise<void> => {
    const evaluationId = parseInt(req.params.id as string)

    const [primaryResult, stage1Result, stage2RisksResult, stage2OppResult] = await Promise.all([
        pool.query('SELECT * FROM primary_data WHERE evaluation_id = $1', [evaluationId]),
        pool.query('SELECT * FROM stage1_scores WHERE evaluation_id = $1', [evaluationId]),
        pool.query('SELECT * FROM stage2_risks WHERE evaluation_id = $1', [evaluationId]),
        pool.query('SELECT * FROM stage2_opportunities WHERE evaluation_id = $1', [evaluationId])
    ])

    if (primaryResult.rows.length === 0) {
        res.status(404).json({ message: 'No evaluation data found' })
        return
    }

    const primary = primaryResult.rows[0]
    const stage1 = stage1Result.rows
    const risks = stage2RisksResult.rows
    const opportunities = stage2OppResult.rows

    const materialTopics = stage1.filter((t: any) => t.is_material)
    const highRisks = risks.filter((r: any) => parseFloat(r.score) >= 3)
    const highOpportunities = opportunities.filter((o: any) => parseFloat(o.score) >= 3)

    const prompt = `
You are a sustainability advisor helping a startup understand their environmental and social impact.

Here is the startup's profile:
- Country: ${primary.country}
- Industry: ${primary.business_category}
- Stage: ${primary.startup_stage}
- Type: ${primary.product_or_service}
- Innovation approach: ${primary.innovation_approach}
- Already launched: ${primary.is_launched}

Material sustainability topics (score >= 2, these require immediate action):
${materialTopics.map((t: any) => `- ${t.topic} (${t.category}): score ${t.score}, magnitude: ${t.magnitude}`).join('\n')}

Non-material topics (score < 2, low priority):
${stage1.filter((t: any) => !t.is_material).map((t: any) => `- ${t.topic}: score ${t.score}`).join('\n')}

High priority risks (score >= 3):
${highRisks.map((r: any) => `- ${r.category}: probability ${r.probability}, impact ${r.impact}, score ${r.score}`).join('\n')}

High priority opportunities (score >= 3):
${highOpportunities.map((o: any) => `- ${o.category}: likelihood ${o.likelihood}, impact ${o.impact}, score ${o.score}`).join('\n')}

Please provide a detailed sustainability action plan with the following structure:

1. Overall assessment (2-3 sentences)
2. For each MATERIAL topic provide:
   - SDG alignment (which SDGs are relevant and why)
   - Fix actions (3-4 immediate quick wins)
   - Build-up actions (3-4 longer term strategic actions)
3. For each HIGH PRIORITY risk provide:
   - Mitigation strategy (3-4 specific actions)
4. For each HIGH PRIORITY opportunity provide:
   - Capture strategy (3-4 specific actions)
5. One encouragement specific to their stage and industry

Format your response as JSON with this structure:
{
  "assessment": "string",
  "materialTopics": [
    {
      "topic": "string",
      "sdgAlignment": "string",
      "fixActions": ["string", "string", "string"],
      "buildUpActions": ["string", "string", "string"]
    }
  ],
  "riskMitigations": [
    {
      "category": "string",
      "actions": ["string", "string", "string"]
    }
  ],
  "opportunityStrategies": [
    {
      "category": "string",
      "actions": ["string", "string", "string"]
    }
  ],
  "encouragement": "string"
}
Return ONLY the JSON with no markdown backticks or extra text.
`

    const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }]
    })

    const text = completion.choices[0].message.content as string

    try {
        const parsed = JSON.parse(text)
        res.status(200).json(parsed)
    } catch {
        res.status(200).json({ raw: text })
    }
}