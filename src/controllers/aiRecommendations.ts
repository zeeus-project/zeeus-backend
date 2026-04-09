import { Request, Response } from 'express'
import pool from '../db/index'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY as string })

export const getAIRecommendations = async (req: Request, res: Response): Promise<void> => {
    const evaluationId = parseInt(req.params.id as string)

    // 1. Fetch all evaluation data
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

    // 2. Get material topics and high risks
    const materialTopics = stage1.filter((t: any) => t.is_material)
    const highRisks = risks.filter((r: any) => parseFloat(r.score) >= 3)
    const highOpportunities = opportunities.filter((o: any) => parseFloat(o.score) >= 3)

    // 3. Build the prompt
    const prompt = `
You are a sustainability advisor helping a startup understand their environmental and social impact.

Here is the startup's profile:
- Country: ${primary.country}
- Industry: ${primary.business_category}
- Stage: ${primary.startup_stage}
- Type: ${primary.product_or_service}
- Innovation approach: ${primary.innovation_approach}
- Already launched: ${primary.is_launched}

Material sustainability topics (score >= 2, these are the most urgent):
${materialTopics.map((t: any) => `- ${t.topic} (${t.category}): score ${t.score}, magnitude: ${t.magnitude}`).join('\n')}

High priority risks (score >= 3):
${highRisks.map((r: any) => `- ${r.category}: probability ${r.probability}, impact ${r.impact}, score ${r.score}`).join('\n')}

High priority opportunities (score >= 3):
${highOpportunities.map((o: any) => `- ${o.category}: likelihood ${o.likelihood}, impact ${o.impact}, score ${o.score}`).join('\n')}

Please provide:
1. A brief overall sustainability assessment (2-3 sentences)
2. Top 3 priority actions the startup should take immediately
3. One key opportunity they should pursue
4. One encouragement specific to their stage and industry

Keep the tone practical, encouraging and specific to this startup's situation.
Format your response as JSON with these keys: assessment, priorityActions (array of 3 strings), keyOpportunity, encouragement.
Return ONLY the JSON with no markdown backticks or extra text.
`

    // 4. Call Groq
    const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }]
    })

    const text = completion.choices[0].message.content as string

    // 5. Parse and return
    try {
        const parsed = JSON.parse(text)
        res.status(200).json(parsed)
    } catch {
        res.status(200).json({ raw: text })
    }
}