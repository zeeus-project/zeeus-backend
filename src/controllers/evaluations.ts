import { Request, Response } from 'express'
import pool from '../db/index'

export const createEvaluation = async (req: Request, res: Response): Promise<void> => {
    const startup_name = req.body.startup_name
    const report_name = req.body.report_name || startup_name
    const userId = (req as any).user.userId
    const result = await pool.query(
        'INSERT INTO evaluations (startup_name, user_id, report_name) VALUES ($1, $2, $3) RETURNING *',
        [startup_name, userId, report_name]
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



export const updateEvaluation = async (req: Request, res: Response): Promise<void> => {
    const evaluationId = parseInt(req.params.id as string)
    const userId = (req as any).user.userId
    const { startup_name, report_name } = req.body

    const result = await pool.query(
        `UPDATE evaluations 
        SET startup_name = COALESCE($1, startup_name),
            report_name = COALESCE($2, report_name),
            updated_at = NOW()
        WHERE id = $3 AND user_id = $4
        RETURNING *`,
        [startup_name, report_name, evaluationId, userId]
    )

    if (result.rows.length === 0) {
        res.status(404).json({ message: 'Evaluation not found' })
        return
    }

    res.status(200).json(result.rows[0])
}