import { Request, Response } from 'express'
import pool from '../db/index'

export const savePrimaryData = async (req: Request, res: Response): Promise<void> => {
    // 1. Get the evaluation ID from the URL e.g. /evaluations/1/primary
    const evaluationId = parseInt(req.params.id as string)
    // 2. Get all form fields from the request body
    const {
        country,
        business_category,
        nace_category,
        use_extended_nace,
        product_or_service,
        is_launched,
        startup_stage,
        innovation_approach
    } = req.body

    // 3. Save to the primary_data table
    const result = await pool.query(
        `INSERT INTO primary_data 
        (evaluation_id, country, business_category, nace_category, use_extended_nace, product_or_service, is_launched, startup_stage, innovation_approach) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *`,
        [evaluationId, country, business_category, nace_category, use_extended_nace, product_or_service, is_launched, startup_stage, innovation_approach]
    )

    // 4. Send back the saved data
    res.status(201).json(result.rows[0])
}

export const getPrimaryData = async (req: Request, res: Response): Promise<void> => {
    // 1. Get the evaluation ID from the URL
    const evaluationId = parseInt(req.params.id as string)

    // 2. Fetch the primary data for this evaluation
    const result = await pool.query(
        'SELECT * FROM primary_data WHERE evaluation_id = $1',
        [evaluationId]
    )

    // 3. If nothing found, send 404
    if (result.rows.length === 0) {
        res.status(404).json({ message: 'No primary data found for this evaluation' })
        return
    }

    // 4. Send back the data
    res.status(200).json(result.rows[0])
}