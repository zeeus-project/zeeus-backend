import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../db/index'

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (result.rows.length > 0) {
        res.status(400).json({ message: 'Email already exists' })
        return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await pool.query(
     'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
     [email, hashedPassword]
    )

    const token = jwt.sign({ userId: newUser.rows[0].id}, process.env.JWT_SECRET as string, { expiresIn: '7d' })
    res.status(201).json({ 
    token,
    role: newUser.rows[0].role  // add this
    })
}


export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]) 
    if (result.rows.length === 0) {
        res.status(400).json({ message: 'Invalid email or password' })
        return
    } 
    const plainTextPassword = password
    const hashedPassword = result.rows[0].password_hash
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword)
    if (!isMatch) {
        res.status(400).json({ message: 'Invalid email or password' })
        return
    }
    const token = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET as string, { expiresIn: '7d' })
    res.status(200).json({ 
    token,
    role: result.rows[0].role  // add this
    })
}

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const result = await pool.query('SELECT id, email, role, created_at FROM users')
    res.status(200).json(result.rows)
}