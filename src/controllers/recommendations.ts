import { Request, Response } from 'express'
import pool from '../db/index'
import { ENVIRONMENTAL_RECOMMENDATIONS, SOCIAL_RECOMMENDATIONS, RISK_RECOMMENDATIONS, OPPORTUNITY_RECOMMENDATIONS, RESOURCE_LINKS } from '../scoring/recommendations'

export const getRecommendations = async (req: Request, res: Response): Promise<void> => {
    const evaluationId = parseInt(req.params.id as string)

    const [stage1Result, risksResult, opportunitiesResult] = await Promise.all([
        pool.query('SELECT * FROM stage1_scores WHERE evaluation_id = $1', [evaluationId]),
        pool.query('SELECT * FROM stage2_risks WHERE evaluation_id = $1', [evaluationId]),
        pool.query('SELECT * FROM stage2_opportunities WHERE evaluation_id = $1', [evaluationId])
    ])

    if (stage1Result.rows.length === 0) {
        res.status(404).json({ message: 'No evaluation data found' })
        return
    }

    const stage1Recommendations = stage1Result.rows.map((topic: any) => {
        const lookup = topic.category === 'environmental'
            ? ENVIRONMENTAL_RECOMMENDATIONS
            : SOCIAL_RECOMMENDATIONS

        const key = `${topic.topic}_${topic.magnitude}`
        const rec = lookup[key]

        return {
            topic: topic.topic,
            category: topic.category,
            magnitude: topic.magnitude,
            score: parseFloat(topic.score),
            isMaterial: topic.is_material,
            whatItMeans: rec?.whatItMeans || 'No recommendation available',
            action: rec?.action || 'No action available',
            resources: RESOURCE_LINKS[topic.topic] || []
        }
    })

    const riskRecommendations = risksResult.rows.map((risk: any) => {
        const probKey = `${risk.category}_Probability_${risk.probability}`
        const impactKey = `${risk.category}_Impact_${risk.impact}`
        const generalKey = `${risk.category}_recommendation`

        return {
            category: risk.category,
            question: risk.question,
            probability: risk.probability,
            impact: risk.impact,
            score: parseFloat(risk.score),
            rating: parseFloat(risk.score) >= 3 ? 'Critical' :
                    parseFloat(risk.score) >= 2 ? 'Severe' :
                    parseFloat(risk.score) >= 1 ? 'Moderate' : 'Sustainable',
            probabilityContext: RISK_RECOMMENDATIONS[probKey] || '',
            impactContext: RISK_RECOMMENDATIONS[impactKey] || '',
            recommendation: RISK_RECOMMENDATIONS[generalKey] || '',
            resources: RESOURCE_LINKS[risk.category] || []
        }
    })

    const opportunityRecommendations = opportunitiesResult.rows.map((opp: any) => {
        const likelihoodKey = `${opp.category}_Likelihood_${opp.likelihood}`
        const impactKey = `${opp.category}_Impact_${opp.impact}`
        const generalKey = `${opp.category}_recommendation`

        return {
            category: opp.category,
            question: opp.question,
            likelihood: opp.likelihood,
            impact: opp.impact,
            score: parseFloat(opp.score),
            rating: parseFloat(opp.score) >= 3 ? 'Great' :
                    parseFloat(opp.score) >= 2 ? 'Sustainable' :
                    parseFloat(opp.score) >= 1 ? 'Reasonable' : 'Small',
            likelihoodContext: OPPORTUNITY_RECOMMENDATIONS[likelihoodKey] || '',
            impactContext: OPPORTUNITY_RECOMMENDATIONS[impactKey] || '',
            recommendation: OPPORTUNITY_RECOMMENDATIONS[generalKey] || '',
            resources: RESOURCE_LINKS[opp.category] || []
        }
    })

    const materialTopics = stage1Recommendations.filter(t => t.isMaterial)
    const highRisks = riskRecommendations.filter(r => r.rating === 'Critical' || r.rating === 'Severe')
    const highOpportunities = opportunityRecommendations.filter(o => o.rating === 'Great' || o.rating === 'Sustainable')

    res.status(200).json({
        priority: {
            materialTopics,
            highRisks,
            highOpportunities
        },
        stage1: stage1Recommendations,
        risks: riskRecommendations,
        opportunities: opportunityRecommendations
    })
}