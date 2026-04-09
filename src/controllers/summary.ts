import { Request, Response } from 'express'
import pool from '../db/index'

const SSEF_MATRIX: Record<string, {
    goal: string
    sustainabilityGoals: string[]
    productGuidance: string
    serviceGuidance: string
    sdgs: number[]
}> = {
    '01_Ideation Stage': {
        goal: 'Identify and refine a viable startup idea.',
        sustainabilityGoals: ['Purpose-driven Vision', 'Resource Awareness'],
        productGuidance: 'Align product concept with a real social/environmental and financial need. Think about materials, waste, energy needed to build and distribute.',
        serviceGuidance: 'Define service values that contribute to ethical or social impact. Consider digital tools, human resource requirements, time efficiency.',
        sdgs: [3, 4, 9, 12, 13]
    },
    '02_Validation Stage (Problem/Solution Fit)': {
        goal: 'Confirm that the problem is real and your solution is desired.',
        sustainabilityGoals: ['Customer Impact', 'Inclusivity'],
        productGuidance: 'Validate that your product improves lives without causing harm. Ensure solution can serve underserved or broad user groups.',
        serviceGuidance: 'Validate that your service benefits users equitably and ethically. Design service to be accessible and inclusive for different communities.',
        sdgs: [3, 4, 5, 10, 11]
    },
    '03_Prototype / Minimum Viable Product Development': {
        goal: 'Build a Minimum Viable Product to test real-world usage.',
        sustainabilityGoals: ['Efficient Use of Resources', 'Waste Minimization'],
        productGuidance: 'Use sustainable strategies/materials, modular design, low-impact prototyping. Avoid overproduction; use recyclable components.',
        serviceGuidance: 'Minimize overuse of platforms/tools, optimize human involvement. Limit redundancy, avoid unnecessary complexity in service delivery.',
        sdgs: [9, 12, 13]
    },
    '04_Pre-Launch / Market Entry Preparation': {
        goal: 'Prepare for first commercial exposure and customer acquisition.',
        sustainabilityGoals: ['Ethical Supply Chain / Tools', 'Team & Culture Values'],
        productGuidance: 'Source responsibly (fair labor, low emissions suppliers). Instill sustainability values in team decisions.',
        serviceGuidance: 'Choose ethical digital infrastructure (hosting, APIs, etc.). Train service team in sustainable practices and inclusive service.',
        sdgs: [5, 8, 10, 12, 17]
    },
    '05_Launch / Early Commercial Activity': {
        goal: 'Acquire first paying customers or users at scale.',
        sustainabilityGoals: ['Eco-Conscious Operations', 'Transparent Communication'],
        productGuidance: 'Minimize shipping, packaging, energy in delivery. Market product sustainability honestly.',
        serviceGuidance: 'Reduce travel, optimize virtual or hybrid service models. Be transparent about the service\'s limitations and values.',
        sdgs: [9, 12, 13, 16]
    },
    '06_Product-Market Fit (PMF)': {
        goal: 'Prove that your product solves a real problem for a sizable market.',
        sustainabilityGoals: ['Customer Education & Engagement', 'Feedback for Impact'],
        productGuidance: 'Educate users on sustainable use, maintenance, and disposal. Use customer feedback to improve environmental/social impact.',
        serviceGuidance: 'Train users on best practices for efficiency, ethical use. Get feedback on inclusivity, accessibility, and value of the service.',
        sdgs: [4, 9, 12, 17]
    },
    '07_Growth & Channel Fit': {
        goal: 'Identify the most effective and scalable channels to acquire users.',
        sustainabilityGoals: ['Sustainable Scaling', 'Energy & Emissions'],
        productGuidance: 'Ensure supply chain, production, and logistics scale responsibly. Monitor and reduce carbon footprint of production and delivery.',
        serviceGuidance: 'Ensure team and systems scale without harming people or overusing resources. Use carbon-efficient tools, promote remote service where possible.',
        sdgs: [7, 8, 9, 13]
    },
    '08_Revenue Validation / Business Model Fit': {
        goal: 'Confirm people are willing to pay enough to build a viable business.',
        sustainabilityGoals: ['Circular or Regenerative Model', 'Financial Sustainability'],
        productGuidance: 'Explore reuse, recycling, or refurbishing. Achieve margins without exploiting resources or people.',
        serviceGuidance: 'Offer sustainable service models (shared economy, pay-as-you-go). Ensure pricing reflects ethical labor and long-term viability.',
        sdgs: [1, 8, 11, 12]
    },
    '09_Operational Foundation': {
        goal: 'Build internal systems and structure to support repeatability and growth.',
        sustainabilityGoals: ['Culture & Policy Alignment'],
        productGuidance: 'Create policies on sustainability, diversity, and ethics.',
        serviceGuidance: 'Embed sustainability in service manuals, onboarding, and policies.',
        sdgs: [5, 10, 16]
    },
    '10_Early Scale / Fundraising Readiness': {
        goal: 'Scale responsibly and prepare for investment if needed.',
        sustainabilityGoals: ['Social Responsibility & Governance (ESG)'],
        productGuidance: 'Set up ESG reporting if raising funds or entering regulated markets.',
        serviceGuidance: 'Establish governance for service quality, ethics, and impact.',
        sdgs: [13, 16, 17]
    }
}

export const getSummary = async (req: Request, res: Response): Promise<void> => {
    const evaluationId = parseInt(req.params.id as string)

    // 1. Fetch primary data
    const result = await pool.query(
        'SELECT * FROM primary_data WHERE evaluation_id = $1',
        [evaluationId]
    )

    if (result.rows.length === 0) {
        res.status(404).json({ message: 'No primary data found for this evaluation' })
        return
    }

    const primary = result.rows[0]

    // 2. Look up stage info from SSEF Matrix
    const stageInfo = SSEF_MATRIX[primary.startup_stage]

    if (!stageInfo) {
        res.status(404).json({ message: 'Stage information not found' })
        return
    }

    // 3. Pick guidance based on product or service
    const guidance = primary.product_or_service === 'Product'
        ? stageInfo.productGuidance
        : stageInfo.serviceGuidance

    // 4. Return the summary
    res.status(200).json({
        startupStage: primary.startup_stage,
        country: primary.country,
        businessCategory: primary.business_category,
        productOrService: primary.product_or_service,
        innovationApproach: primary.innovation_approach,
        stageGoal: stageInfo.goal,
        sustainabilityGoals: stageInfo.sustainabilityGoals,
        guidance,
        initialSDGs: stageInfo.sdgs,
        note: 'These SDGs are based on your stage and industry. They will be refined as you complete Stage I and II.'
    })
}