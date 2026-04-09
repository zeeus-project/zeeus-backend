import { Request, Response } from 'express'
import pool from '../db/index'

const SDG_TITLES: Record<number, string> = {
    1: 'No Poverty',
    2: 'Zero Hunger',
    3: 'Good Health and Well-being',
    4: 'Quality Education',
    5: 'Gender Equality',
    6: 'Clean Water and Sanitation',
    7: 'Affordable and Clean Energy',
    8: 'Decent Work and Economic Growth',
    9: 'Industry, Innovation and Infrastructure',
    10: 'Reduced Inequalities',
    11: 'Sustainable Cities and Communities',
    12: 'Responsible Consumption and Production',
    13: 'Climate Action',
    14: 'Life Below Water',
    15: 'Life on Land',
    16: 'Peace, Justice and Strong Institutions',
    17: 'Partnerships for the Goals'
}

const SSEF_MATRIX: Record<string, {
    goal: string
    sustainabilityGoals: string[]
    productGuidance: string
    serviceGuidance: string
    sdgs: number[]
    activities: string[]
    keyActions: string[]
}> = {
    '01_Ideation Stage': {
        goal: 'Identify and refine a viable startup idea.',
        sustainabilityGoals: ['Purpose-driven Vision', 'Resource Awareness'],
        productGuidance: 'Align product concept with a real social/environmental and financial need. Think about materials, waste, energy needed to build and distribute.',
        serviceGuidance: 'Define service values that contribute to ethical or social impact. Consider digital tools, human resource requirements, time efficiency.',
        sdgs: [3, 4, 9, 12, 13],
        activities: [
            'Brainstorm problems worth solving.',
            'Spot gaps in existing markets or needs in new ones.',
            'Leverage personal pain points or domain expertise.',
            'Conduct light market research (online search, talking to potential users).',
            'Write a simple problem statement and potential solution.',
            'Begin forming a founding team (if needed).'
        ],
        keyActions: []
    },
    '02_Validation Stage (Problem/Solution Fit)': {
        goal: 'Confirm that the problem is real and your solution is desired.',
        sustainabilityGoals: ['Customer Impact', 'Inclusivity'],
        productGuidance: 'Validate that your product improves lives without causing harm. Ensure solution can serve underserved or broad user groups.',
        serviceGuidance: 'Validate that your service benefits users equitably and ethically. Design service to be accessible and inclusive for different communities.',
        sdgs: [3, 4, 5, 10, 11],
        activities: [
            'Conduct customer interviews.',
            'Validate that the problem exists and is painful enough to solve.',
            'Sketch initial solution concepts (paper prototype or clickable mockups).',
            'Use surveys or no-code tools to test interest (e.g., landing pages).',
            'Start thinking about business model hypotheses (e.g., who pays, how much).',
            'May build a "pre-Minimum viable product" (demo, mockup, or concierge version).'
        ],
        keyActions: []
    },
    '03_Prototype / Minimum Viable Product Development': {
        goal: 'Build a Minimum Viable Product to test real-world usage.',
        sustainabilityGoals: ['Efficient Use of Resources', 'Waste Minimization'],
        productGuidance: 'Use sustainable strategies/materials, modular design, low-impact prototyping. Avoid overproduction; use recyclable components.',
        serviceGuidance: 'Minimize overuse of platforms/tools, optimize human involvement. Limit redundancy, avoid unnecessary complexity in service delivery.',
        sdgs: [9, 12, 13],
        activities: [
            'Develop a simple version of the product with core features.',
            'Use agile or lean methodology (build-measure-learn loops).',
            'Start engaging alpha or beta users.',
            'Collect data on usage, retention, feedback.',
            'Continue iterating based on feedback.',
            'Establish clear KPIs (e.g., user signups, active usage).'
        ],
        keyActions: []
    },
    '04_Pre-Launch / Market Entry Preparation': {
        goal: 'Prepare for first commercial exposure and customer acquisition.',
        sustainabilityGoals: ['Ethical Supply Chain / Tools', 'Team & Culture Values'],
        productGuidance: 'Source responsibly (fair labor, low emissions suppliers). Instill sustainability values in team decisions.',
        serviceGuidance: 'Choose ethical digital infrastructure (hosting, APIs, etc.). Train service team in sustainable practices and inclusive service.',
        sdgs: [5, 8, 10, 12, 17],
        activities: [
            'Finalize branding, website, and legal structure (e.g., incorporate).',
            'Define pricing (if applicable) and GTM (go-to-market) plan.',
            'Set up analytics, Customer Relationship Management, and customer support channels.',
            'Create early marketing assets (landing page, email campaign, etc.).',
            'Soft launch with a small group (early adopters, waitlist, etc.).'
        ],
        keyActions: []
    },
    '05_Launch / Early Commercial Activity': {
        goal: 'Acquire first paying customers or users at scale.',
        sustainabilityGoals: ['Eco-Conscious Operations', 'Transparent Communication'],
        productGuidance: 'Minimize shipping, packaging, energy in delivery. Market product sustainability honestly.',
        serviceGuidance: 'Reduce travel, optimize virtual or hybrid service models. Be transparent about the service\'s limitations and values.',
        sdgs: [9, 12, 13, 16],
        activities: [
            'Launch publicly (Product Hunt, social media, niche communities).',
            'Begin initial sales or transactions.',
            'Run ads or content marketing (small-scale).',
            'Close first commercial deals (B2B) or onboard early users (B2C).',
            'Track metrics like CAC (Customer Acquisition Cost), Lifetime Value, churn, etc.',
            'Start building case studies, testimonials, or references.'
        ],
        keyActions: []
    },
    '06_Product-Market Fit (PMF)': {
        goal: 'Prove that your product/service solves a real problem for a sizable market — and users come back for it.',
        sustainabilityGoals: ['Customer Education & Engagement', 'Feedback for Impact'],
        productGuidance: 'Educate users on sustainable use, maintenance, and disposal. Use customer feedback to improve environmental/social impact.',
        serviceGuidance: 'Train users on best practices for efficiency, ethical use. Get feedback on inclusivity, accessibility, and value of the service.',
        sdgs: [4, 9, 12, 17],
        activities: [
            'High customer retention and engagement.',
            'Users are recommending your product organically.',
            'You solve a "must-have" problem (not a "nice-to-have").',
            'People would be disappointed if your product disappeared.'
        ],
        keyActions: [
            'Analyze usage metrics (Sales metrics, Operational metrics, Daily Active Users/Monthly Active Users, churn, Net Promoter Score etc.).',
            'Keep iterating on product based on user feedback.',
            'Start optimizing onboarding and experience.',
            'Refine your core value proposition.'
        ]
    },
    '07_Growth & Channel Fit': {
        goal: 'Identify the most effective and scalable channels to acquire users or customers.',
        sustainabilityGoals: ['Sustainable Scaling', 'Energy & Emissions'],
        productGuidance: 'Ensure supply chain, production, and logistics scale responsibly. Monitor and reduce carbon footprint of production and delivery.',
        serviceGuidance: 'Ensure team and systems scale without harming people or overusing resources. Use carbon-efficient tools, promote remote service where possible.',
        sdgs: [7, 8, 9, 13],
        activities: [
            'Where your customers are (and how to reach them cost-effectively).',
            'What acquisition channels scale (paid ads, Search Engine Optimization, partnerships, viral loops, etc.).',
            'What messaging converts best.'
        ],
        keyActions: [
            'Test and double down on scalable acquisition channels.',
            'Start calculating CAC (Customer Acquisition Cost) vs LTV (Lifetime Value).',
            'Build early marketing/sales systems (CRM, analytics, email workflows).',
            'Consider experimenting with pricing, packaging, or sales motion (PLG vs sales-led).'
        ]
    },
    '08_Revenue Validation / Business Model Fit': {
        goal: 'Confirm people are willing to pay enough for you to build a viable business.',
        sustainabilityGoals: ['Circular or Regenerative Model', 'Financial Sustainability'],
        productGuidance: 'Explore reuse, recycling, or refurbishing. Achieve margins without exploiting resources or people.',
        serviceGuidance: 'Offer sustainable service models (shared economy, pay-as-you-go). Ensure pricing reflects ethical labor and long-term viability.',
        sdgs: [1, 8, 11, 12],
        activities: [
            'Consistent, Total revenue, growing Monthly Recurring Revenue/Annual Recurring Revenue or transaction volume.',
            'Paying customers or repeat purchases.',
            'Strong unit economics (Lifetime Value > Customer Acquisition Cost, decent gross margins).'
        ],
        keyActions: [
            'Experiment with pricing models (subscription, freemium, transactional).',
            'Develop your first financial projections (burn rate, runway, breakeven).',
            'Consider hiring/outsourcing basic finance, bookkeeping.'
        ]
    },
    '09_Operational Foundation': {
        goal: 'Build internal systems and structure to support repeatability and growth.',
        sustainabilityGoals: ['Culture & Policy Alignment'],
        productGuidance: 'Create policies on sustainability, diversity, and ethics.',
        serviceGuidance: 'Embed sustainability in service manuals, onboarding, and policies.',
        sdgs: [5, 10, 16],
        activities: [
            'Early team (tech, ops, support, marketing).',
            'Roles and responsibilities clarified.',
            'Basic processes documented (support, hiring, product releases).'
        ],
        keyActions: [
            'Hire or contract to fill key gaps.',
            'Define core metrics (OKRs (Objectives and Key Results), KPIs).',
            'Implement internal tools (Notion, Slack, task management, etc.).',
            'Develop company culture and values early on.'
        ]
    },
    '10_Early Scale / Fundraising Readiness': {
        goal: 'Scale responsibly and prepare for investment if needed.',
        sustainabilityGoals: ['Social Responsibility & Governance (ESG)'],
        productGuidance: 'Set up ESG reporting if raising funds or entering regulated markets.',
        serviceGuidance: 'Establish governance for service quality, ethics, and impact.',
        sdgs: [13, 16, 17],
        activities: [
            'Consistent user/customer growth.',
            'Growing revenue with strong retention.',
            'Scalable acquisition model.',
            'Clear roadmap and financial plan.'
        ],
        keyActions: [
            'Prepare pitch deck and data room (if fundraising).',
            'Talk to angels, seed funds, or accelerators.',
            'Set clear short-term goals for next phase (e.g., Series A readiness, international expansion, etc.).'
        ]
    }
}

export const getSummary = async (req: Request, res: Response): Promise<void> => {
    const evaluationId = parseInt(req.params.id as string)

    const result = await pool.query(
        'SELECT * FROM primary_data WHERE evaluation_id = $1',
        [evaluationId]
    )

    if (result.rows.length === 0) {
        res.status(404).json({ message: 'No primary data found for this evaluation' })
        return
    }

    const primary = result.rows[0]
    const stageInfo = SSEF_MATRIX[primary.startup_stage]

    if (!stageInfo) {
        res.status(404).json({ message: 'Stage information not found' })
        return
    }

    const guidance = primary.product_or_service === 'Product'
        ? stageInfo.productGuidance
        : stageInfo.serviceGuidance

    res.status(200).json({
        startupStage: primary.startup_stage,
        country: primary.country,
        businessCategory: primary.business_category,
        productOrService: primary.product_or_service,
        innovationApproach: primary.innovation_approach,
        stageGoal: stageInfo.goal,
        sustainabilityGoals: stageInfo.sustainabilityGoals,
        guidance,
        activities: stageInfo.activities,
        keyActions: stageInfo.keyActions,
        initialSDGs: stageInfo.sdgs.map(sdg => ({
            sdg_number: sdg,
            sdg_title: SDG_TITLES[sdg]
        })),
        note: 'These SDGs are based on your stage and industry. They will be refined as you complete Stage I and II.'
    })
}