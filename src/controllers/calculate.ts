import { Request, Response } from 'express'
import { calculateMaterialityScore } from '../scoring/stage1'
import { calculateRiskScore, calculateOpportunityScore } from '../scoring/stage2'

export const calculateStage1 = async (req: Request, res: Response): Promise<void> => {
    const { magnitude, scale, irreversibility, likelihood } = req.body
    const result = calculateMaterialityScore(magnitude, scale, irreversibility, likelihood)
    res.status(200).json(result)
}

export const calculateRisk = async (req: Request, res: Response): Promise<void> => {
    const { probability, impact } = req.body
    const result = calculateRiskScore(probability, impact)
    res.status(200).json(result)
}

export const calculateOpportunity = async (req: Request, res: Response): Promise<void> => {
    const { likelihood, impact } = req.body
    const result = calculateOpportunityScore(likelihood, impact)
    res.status(200).json(result)
}