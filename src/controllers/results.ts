import { Request, Response } from 'express'
import pool from '../db/index'

export const getResults = async (req: Request, res: Response): Promise<void> => {
    const evaluationId = parseInt(req.params.id as string)

    // 1. Run all queries in parallel
    const [
        evaluationResult,
        primaryResult,
        stage1Result,
        financialResult,
        risksResult,
        opportunitiesResult,
        sdgResult
    ] = await Promise.all([
        pool.query('SELECT * FROM evaluations WHERE id = $1', [evaluationId]),
        pool.query('SELECT * FROM primary_data WHERE evaluation_id = $1', [evaluationId]),
        pool.query('SELECT * FROM stage1_scores WHERE evaluation_id = $1', [evaluationId]),
        pool.query('SELECT * FROM stage1_financial WHERE evaluation_id = $1', [evaluationId]),
        pool.query('SELECT * FROM stage2_risks WHERE evaluation_id = $1', [evaluationId]),
        pool.query('SELECT * FROM stage2_opportunities WHERE evaluation_id = $1', [evaluationId]),
        pool.query('SELECT * FROM sdg_mappings WHERE evaluation_id = $1', [evaluationId])
    ])

    // 2. Extract rows
    const evaluation = evaluationResult.rows[0]
    const primaryData = primaryResult.rows[0]
    const stage1Scores = stage1Result.rows
    const financialKPIs = financialResult.rows
    const risks = risksResult.rows
    const opportunities = opportunitiesResult.rows
    const sdgs = sdgResult.rows

    // 3. If evaluation not found send 404
    if (!evaluation) {
        res.status(404).json({ message: 'Evaluation not found' })
        return
    }

    // 4. Split stage1 into environmental and social
    const environmental = stage1Scores.filter((t: any) => t.category === 'environmental')
    const social = stage1Scores.filter((t: any) => t.category === 'social')

    // 5. Calculate average scores
    const avgEnvironmental = environmental.length > 0
        ? environmental.reduce((sum: number, t: any) => sum + parseFloat(t.score), 0) / environmental.length
        : 0

    const avgSocial = social.length > 0
        ? social.reduce((sum: number, t: any) => sum + parseFloat(t.score), 0) / social.length
        : 0

    // 6. Get material topics
    const materialTopics = stage1Scores.filter((t: any) => t.is_material === true)

    // 7. Calculate financial total
    const financialTotal = financialKPIs.reduce((sum: number, k: any) => sum + k.score, 0)

    // 8. Get high risks and opportunities
    const highRisks = risks.filter((r: any) => parseFloat(r.score) >= 3)
    const highOpportunities = opportunities.filter((o: any) => parseFloat(o.score) >= 3)

    // 9. Format chart data for frontend
    const environmentalChartData = environmental.map((t: any) => ({
        topic: t.topic,
        score: parseFloat(t.score),
        material: t.is_material
    }))

    const socialChartData = social.map((t: any) => ({
        topic: t.topic,
        score: parseFloat(t.score),
        material: t.is_material
    }))

    const riskChartData = risks.map((r: any) => ({
        category: r.category,
        score: parseFloat(r.score),
        probability: r.probability,
        impact: r.impact,
        rating: parseFloat(r.score) >= 3 ? 'High' :
                parseFloat(r.score) >= 2 ? 'Medium' :
                parseFloat(r.score) >= 1 ? 'Low' : 'Negligible'
    }))

    const opportunityChartData = opportunities.map((o: any) => ({
        category: o.category,
        score: parseFloat(o.score),
        likelihood: o.likelihood,
        impact: o.impact,
        rating: parseFloat(o.score) >= 3 ? 'High' :
                parseFloat(o.score) >= 2 ? 'Medium' :
                parseFloat(o.score) >= 1 ? 'Low' : 'Negligible'
    }))

    // 10. Send everything back in one response
    res.status(200).json({
        evaluation,
        primaryData,
        financial: {
            kpis: financialKPIs,
            totalScore: financialTotal,
            maxScore: 12
        },
        stage1: {
            environmental,
            social,
            averageEnvironmental: Math.round(avgEnvironmental * 100) / 100,
            averageSocial: Math.round(avgSocial * 100) / 100,
            materialTopics,
            environmentalChartData,
            socialChartData
        },
        stage2: {
            risks,
            opportunities,
            highRisks,
            highOpportunities,
            riskChartData,
            opportunityChartData
        },
        sdgs
    })
}