import { Request, Response } from 'express'
import pool from '../db/index'
import { calculateFinancialScore } from '../scoring/financial'

export const saveFinancial = async (req: Request, res: Response): Promise<void> => {
    // 1. Get evaluation ID from the URL
    const evaluationId = parseInt(req.params.id as string)

    // 2. Get the array of KPIs from the request body
    const kpis = req.body

    // 3. Delete any existing financial scores for this evaluation
    await pool.query('DELETE FROM stage1_financial WHERE evaluation_id = $1', [evaluationId])

    // 4. Loop through each KPI, calculate score and save to database
    for (const kpi of kpis) {
        const score = calculateFinancialScore(kpi.is_evaluated, kpi.rating)

        await pool.query(
            `INSERT INTO stage1_financial 
            (evaluation_id, kpi_name, is_evaluated, rating, score)
            VALUES ($1, $2, $3, $4, $5)`,
            [evaluationId, kpi.kpi_name, kpi.is_evaluated, kpi.rating, score]
        )
    }

    // 5. Fetch all saved KPIs and send back
    const result = await pool.query(
        'SELECT * FROM stage1_financial WHERE evaluation_id = $1',
        [evaluationId]
    )

    // 6. Calculate total score and max possible
    const totalScore = result.rows.reduce((sum: number, row: any) => sum + row.score, 0)
    const maxScore = 12 // 4 KPIs × max 3 points each

    res.status(201).json({
        kpis: result.rows,
        totalScore,
        maxScore
    })
}

export const getFinancial = async (req: Request, res: Response): Promise<void> => {
    // 1. Get evaluation ID from the URL
    const evaluationId = parseInt(req.params.id as string)

    // 2. Fetch all KPIs for this evaluation
    const result = await pool.query(
        'SELECT * FROM stage1_financial WHERE evaluation_id = $1',
        [evaluationId]
    )

    // 3. If nothing found send 404
    if (result.rows.length === 0) {
        res.status(404).json({ message: 'No financial data found for this evaluation' })
        return
    }

    // 4. Calculate total score and max possible
    const totalScore = result.rows.reduce((sum: number, row: any) => sum + row.score, 0)
    const maxScore = 12

    res.status(200).json({
        kpis: result.rows,
        totalScore,
        maxScore
    })
}