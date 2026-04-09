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


export const deleteEvaluation = async (req: Request, res: Response): Promise<void> => {
    const evaluationId = parseInt(req.params.id as string)
    const userId = (req as any).user.userId

    const result = await pool.query(
        'DELETE FROM evaluations WHERE id = $1 AND user_id = $2 RETURNING *',
        [evaluationId, userId]
    )

    if (result.rows.length === 0) {
        res.status(404).json({ message: 'Evaluation not found or you do not have permission to delete it' })
        return
    }

    res.status(200).json({ message: 'Evaluation deleted successfully' })
}


export const getAllEvaluations = async (req: Request, res: Response): Promise<void> => {
    const result = await pool.query('SELECT * FROM evaluations')
    res.status(200).json(result.rows)
}