import { Request, Response } from 'express'
import pool from '../db/index'
import { calculateRiskScore, calculateOpportunityScore } from '../scoring/stage2'

export const saveStage2 = async (req: Request, res: Response): Promise<void> => {
    
    const evaluationId = parseInt(req.params.id as string)

    const risks = req.body.stage2_risks
    const opportunities = req.body.stage2_opportunities

    // Delete existing data before saving new
    await pool.query('DELETE FROM stage2_risks WHERE evaluation_id = $1', [evaluationId])
    await pool.query('DELETE FROM stage2_opportunities WHERE evaluation_id = $1', [evaluationId])

    for (const risk of risks) {
        const { riskScore, rating } = calculateRiskScore(risk.probability, risk.impact)
        
        await pool.query(
            `INSERT INTO stage2_risks 
            (evaluation_id, category, question, probability, impact, is_applicable, score)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [evaluationId, risk.category, risk.question, risk.probability, risk.impact, risk.is_applicable, riskScore]
        )
    }

    for (const opportunity of opportunities) {
        const { opportScore, rating } = calculateOpportunityScore(opportunity.likelihood, opportunity.impact)

        await pool.query(
            `INSERT INTO stage2_opportunities 
            (evaluation_id, category, question, likelihood, impact, is_applicable, score)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [evaluationId, opportunity.category, opportunity.question, opportunity.likelihood, opportunity.impact, opportunity.is_applicable, opportScore]
        )
    }

    const result1 = await pool.query(
        'SELECT * FROM stage2_risks WHERE evaluation_id = $1',
        [evaluationId]
    )

    const result2 = await pool.query(
        'SELECT * FROM stage2_opportunities WHERE evaluation_id = $1',
        [evaluationId]
    )

    res.status(200).json({
        risks: result1.rows,
        opportunities: result2.rows
    })
}

export const getStage2 = async (req: Request, res: Response): Promise<void> => {
    const evaluationId = parseInt(req.params.id as string)

    const result1 = await pool.query(
        'SELECT * FROM stage2_risks WHERE evaluation_id = $1',
        [evaluationId]
    )

    const result2 = await pool.query(
        'SELECT * FROM stage2_opportunities WHERE evaluation_id = $1',
        [evaluationId]
    )

    if (result1.rows.length === 0 && result2.rows.length === 0) {
        res.status(404).json({ message: 'No Stage II data found for this evaluation' })
        return
    }

    res.status(200).json({
        risks: result1.rows,
        opportunities: result2.rows
    })
}