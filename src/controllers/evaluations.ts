import { Request, Response } from 'express'
import pool from '../db/index'

export const createEvaluation = async (req: Request, res: Response): Promise<void> => {
    const startup_name = req.body.startup_name
    const userId = (req as any).user.userId
    const result = await pool.query(
        'INSERT INTO evaluations (startup_name, user_id) VALUES ($1, $2) RETURNING *',
        [startup_name, userId]
    )
    res.status(201).json(result.rows[0])
}

export const getEvaluations = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.userId
    const result = await pool.query('SELECT * FROM evaluations WHERE user_id = $1', [userId]) 
    res.status(200).json(result.rows)
}