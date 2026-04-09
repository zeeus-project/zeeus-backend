import { Request, Response } from 'express'
import pool from '../db/index'

export const getResults = async (req: Request, res: Response): Promise<void> => {
    const evaluationId = parseInt(req.params.id as string)

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

    const evaluation = evaluationResult.rows[0]
    const primaryData = primaryResult.rows[0]
    const stage1Scores = stage1Result.rows
    const financialKPIs = financialResult.rows
    const risks = risksResult.rows
    const opportunities = opportunitiesResult.rows
    const sdgs = sdgResult.rows

    if (!evaluation) {
        res.status(404).json({ message: 'Evaluation not found' })
        return
    }

    const environmental = stage1Scores.filter((t: any) => t.category === 'environmental')
    const social = stage1Scores.filter((t: any) => t.category === 'social')

    const avgEnvironmental = environmental.length > 0
        ? environmental.reduce((sum: number, t: any) => sum + parseFloat(t.score), 0) / environmental.length
        : 0

    const avgSocial = social.length > 0
        ? social.reduce((sum: number, t: any) => sum + parseFloat(t.score), 0) / social.length
        : 0

    const materialTopics = stage1Scores.filter((t: any) => t.is_material === true)
    const financialTotal = financialKPIs.reduce((sum: number, k: any) => sum + k.score, 0)
    const highRisks = risks.filter((r: any) => parseFloat(r.score) >= 3)
    const highOpportunities = opportunities.filter((o: any) => parseFloat(o.score) >= 3)

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
        rating: parseFloat(r.score) >= 3 ? 'Critical' :
                parseFloat(r.score) >= 2 ? 'Severe' :
                parseFloat(r.score) >= 1 ? 'Moderate' : 'Sustainable'
    }))

    const opportunityChartData = opportunities.map((o: any) => ({
        category: o.category,
        score: parseFloat(o.score),
        likelihood: o.likelihood,
        impact: o.impact,
        rating: parseFloat(o.score) >= 3 ? 'Great' :
                parseFloat(o.score) >= 2 ? 'Sustainable' :
                parseFloat(o.score) >= 1 ? 'Reasonable' : 'Small'
    }))

    const riskRatingCounts = {
        Critical: risks.filter((r: any) => parseFloat(r.score) >= 3).length,
        Severe: risks.filter((r: any) => parseFloat(r.score) >= 2 && parseFloat(r.score) < 3).length,
        Moderate: risks.filter((r: any) => parseFloat(r.score) >= 1 && parseFloat(r.score) < 2).length,
        Sustainable: risks.filter((r: any) => parseFloat(r.score) < 1).length
    }

    const opportunityRatingCounts = {
        Great: opportunities.filter((o: any) => parseFloat(o.score) >= 3).length,
        Sustainable: opportunities.filter((o: any) => parseFloat(o.score) >= 2 && parseFloat(o.score) < 3).length,
        Reasonable: opportunities.filter((o: any) => parseFloat(o.score) >= 1 && parseFloat(o.score) < 2).length,
        Small: opportunities.filter((o: any) => parseFloat(o.score) < 1).length
    }

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
            opportunityChartData,
            riskRatingCounts,
            opportunityRatingCounts
        },
        sdgs
    })
}