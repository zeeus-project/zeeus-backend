import { Request, Response, NextFunction } from 'express'
import pool from '../db/index'

export const checkAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).user.userId

    const result = await pool.query('SELECT role FROM users WHERE id = $1', [userId])

    if (result.rows.length === 0 || result.rows[0].role !== 'admin') {
        res.status(403).json({ message: 'Access denied. Admins only.' })
        return
    }

    next()
}