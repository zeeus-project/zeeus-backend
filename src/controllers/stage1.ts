import { Request, Response } from 'express'
import pool from '../db/index'
import { calculateMaterialityScore } from '../scoring/stage1'

export const saveStage1 = async (req: Request, res: Response): Promise<void> => {
    // 1. Get evaluation ID from the URL
    const evaluationId = parseInt(req.params.id as string)

    // 2. Get the array of topics from the request body
    const topics = req.body

    // 3. Delete any existing scores for this evaluation (in case they're resubmitting)
    await pool.query('DELETE FROM stage1_scores WHERE evaluation_id = $1', [evaluationId])

    // 4. Loop through each topic, calculate score and save to database
    for (const topic of topics) {
        const { score, isMaterial } = calculateMaterialityScore(
            topic.magnitude,
            topic.scale,
            topic.irreversibility,
            topic.likelihood
        )
        await pool.query(
            `INSERT INTO stage1_scores 
            (evaluation_id, category, topic, magnitude, scale, irreversibility, likelihood, is_applicable, score, is_material)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [evaluationId, topic.category, topic.topic, topic.magnitude, topic.scale, topic.irreversibility, topic.likelihood, topic.is_applicable, score, isMaterial]
        )
    }

    // 5. Fetch all the saved scores and send back
    const result = await pool.query(
        'SELECT * FROM stage1_scores WHERE evaluation_id = $1',
        [evaluationId]
    )
    res.status(201).json(result.rows)
}

export const getStage1 = async (req: Request, res: Response): Promise<void> => {
    // 1. Get evaluation ID from the URL
    const evaluationId = parseInt(req.params.id as string)

    // 2. Fetch all scores for this evaluation
    const result = await pool.query(
        'SELECT * FROM stage1_scores WHERE evaluation_id = $1',
        [evaluationId]
    )

    // 3. If nothing found send 404
    if (result.rows.length === 0) {
        res.status(404).json({ message: 'No Stage I data found for this evaluation' })
        return
    }

    // 4. Send back the scores
    res.status(200).json(result.rows)
}