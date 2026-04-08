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

const INDUSTRY_SDGS: Record<string, number[]> = {
    'Agriculture, Forestry, and Fishing': [2, 12],
    'Mining and Quarrying': [8, 9],
    'Manufacturing': [8, 9],
    'Electricity, Gas, Steam, and Air Conditioning Supply': [7, 9],
    'Water Supply; Sewerage, Waste Management, and Remediation Activities': [6, 11],
    'Construction': [9, 11],
    'Wholesale and Retail Trade; Repair of Motor Vehicles and Motorcycles': [8, 12],
    'Transportation and Storage': [9, 11],
    'Accommodation and Food Service Activities': [3, 8],
    'Information and Communication': [4, 9],
    'Financial and Insurance Activities': [8, 10],
    'Real Estate Activities': [11, 12],
    'Professional, Scientific, and Technical Activities': [4, 8],
    'Administrative and Support Service Activities': [8, 10],
    'Public Administration and Defence; Compulsory Social Security': [16, 17],
    'Education': [4, 5],
    'Human Health and Social Work Activities': [3, 10],
    'Arts, Entertainment, and Recreation': [3, 4],
    'Other Service Activities': [8, 12],
    'Activities of Households as Employers': [5, 8],
    'Other': []
}

const STAGE_SDGS: Record<string, number[]> = {
    '01_Ideation Stage': [3, 4, 9, 12, 13],
    '02_Validation Stage (Problem/Solution Fit)': [3, 4, 5, 10, 11],
    '03_Prototype / Minimum Viable Product Development': [9, 12, 13],
    '04_Pre-Launch / Market Entry Preparation': [5, 8, 10, 12, 17],
    '05_Launch / Early Commercial Activity': [9, 12, 13, 16],
    '06_Product-Market Fit (PMF)': [4, 9, 12, 17],
    '07_Growth & Channel Fit': [7, 8, 9, 13],
    '08_Revenue Validation / Business Model Fit': [1, 8, 11, 12],
    '09_Operational Foundation': [5, 10, 16],
    '10_Early Scale / Fundraising Readiness': [13, 16, 17]
}

export const getSDGs = async (req: Request, res: Response): Promise<void> => {
    // 1. Get evaluation ID from URL
    const evaluationId = parseInt(req.params.id as string)

    // 2. Fetch primary data for this evaluation
    const primaryData = await pool.query(
        'SELECT * FROM primary_data WHERE evaluation_id = $1',
        [evaluationId]
    )

    if (primaryData.rows.length === 0) {
        res.status(404).json({ message: 'No primary data found for this evaluation' })
        return
    }

    const { business_category, startup_stage } = primaryData.rows[0]

    // 3. Look up SDGs for industry and stage
    const industrySDGs = INDUSTRY_SDGS[business_category] || []
    const stageSDGs = STAGE_SDGS[startup_stage] || []

    // 4. Combine and deduplicate
    const uniqueSDGs = Array.from(new Set([...industrySDGs, ...stageSDGs]))

    // 5. Tag each SDG with its source
    const taggedSDGs = uniqueSDGs.map((sdgNumber) => {
        const inIndustry = industrySDGs.includes(sdgNumber)
        const inStage = stageSDGs.includes(sdgNumber)

        let source = ''
        if (inIndustry && inStage) source = 'both'
        else if (inIndustry) source = 'industry'
        else source = 'stage'

        return {
            sdg_number: sdgNumber,
            sdg_title: SDG_TITLES[sdgNumber],
            source
        }
    })

    // 6. Delete old SDG mappings for this evaluation
    await pool.query(
        'DELETE FROM sdg_mappings WHERE evaluation_id = $1',
        [evaluationId]
    )

    // 7. Save each SDG to the database
    for (const sdg of taggedSDGs) {
        await pool.query(
            `INSERT INTO sdg_mappings (evaluation_id, sdg_number, sdg_title, source)
            VALUES ($1, $2, $3, $4)`,
            [evaluationId, sdg.sdg_number, sdg.sdg_title, sdg.source]
        )
    }

    // 8. Fetch and return saved mappings
    const result = await pool.query(
        'SELECT * FROM sdg_mappings WHERE evaluation_id = $1',
        [evaluationId]
    )

    res.status(200).json(result.rows)
}