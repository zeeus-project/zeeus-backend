import { Request, Response } from 'express'

export const getStage1Topics = (req: Request, res: Response): void => {
    res.status(200).json({
        environmental: [
            { topic: 'Water', question: 'Do we threaten local ecosystems through water withdrawal?' },
            { topic: 'Pollution', question: 'Do our processes cause significant environmental pollution?' },
            { topic: 'Biodiversity', question: 'Do our activities destroy ecosystems or biodiversity (both fauna and flora)?' },
            { topic: 'Circular Economy', question: 'How intensive is our use of resources and waste production?' },
            { topic: 'Climate Change', question: 'How much do our activities contribute to global warming?' }
        ],
        social: [
            { topic: 'Own Workforce (S1)', question: 'Do our practices violate employee rights?' },
            { topic: 'Supply Chain (S2)', question: 'Are there risks of labor violations in our value chain?' },
            { topic: 'Communities (S3)', question: 'Do our actions impact local communities negatively?' },
            { topic: 'Consumers (S4)', question: 'Do our products or services harm consumer rights?' },
            { topic: 'Corporate Ethics (G1)', question: 'Do poor standards cause ethical violations in our company?' }
        ],
        financial: [
            { kpi: 'Economic KPIs', question: 'How do your ROI, IRR, NPV and Payback Period compare to industry benchmarks?' },
            { kpi: 'Sensitivity Analysis', question: 'How robust is your business model under different scenarios?' },
            { kpi: 'USP / Strategic Fit', question: 'How strong and unique is your value proposition?' },
            { kpi: 'Market Growth', question: 'Is your target market growing, mature or shrinking?' }
        ],
        scoringGuide: {
            magnitude: [
                { label: 'Low', score: 1, description: 'Minor impact, easily manageable' },
                { label: 'Moderate', score: 2, description: 'Noticeable impact, requires monitoring' },
                { label: 'Significant', score: 3, description: 'Considerable impact, action required' },
                { label: 'High', score: 4, description: 'Severe impact, urgent action needed' },
                { label: 'N/A', score: 0, description: 'Not applicable to your business' }
            ],
            likelihood: [
                { label: 'Very unlikely', value: 0.25, description: 'Unlikely to occur' },
                { label: 'Unlikely', value: 0.50, description: 'Could possibly occur' },
                { label: 'Likely', value: 0.75, description: 'Will probably occur' },
                { label: 'Very likely', value: 1.0, description: 'Almost certain to occur' }
            ]
        }
    })
}

export const getStage2Topics = (req: Request, res: Response): void => {
    res.status(200).json({
        risks: [
            {
                category: 'Climate (E1, E2)',
                items: [
                    { question: 'What financial risks arise from stricter climate policy or penalties for environmental harm?' },
                    { question: 'How severe would the financial or operational impact be if the risk occurs?' }
                ]
            },
            {
                category: 'Water/Biodiversity (E3, E4)',
                items: [
                    { question: 'How does water scarcity affect our operations?' },
                    { question: 'What constraints do biodiversity regulations create?' }
                ]
            },
            {
                category: 'Circular Economy (E5)',
                items: [
                    { question: 'How does resource scarcity affect our business model?' },
                    { question: 'How severe are the financial or operational effects from resource scarcity?' }
                ]
            },
            {
                category: 'Communities (S3)',
                items: [
                    { question: 'What social risks affect our site stability?' },
                    { question: 'How severe would the consequences be if community opposition occurs?' }
                ]
            },
            {
                category: 'Consumers & Governance (S4, G1)',
                items: [
                    { question: 'What is the probability that evolving consumer protection and AI/advertising regulations will trigger complaints, fines, or loss of market access?' },
                    { question: 'How severe would the impact be if consumer protection issues arise?' }
                ]
            }
        ],
        opportunities: [
            {
                category: 'Climate (E1, E2)',
                items: [
                    { question: 'How can we benefit from the transition to climate neutrality and low-emission solutions?' },
                    { question: 'How large is the potential competitive or financial benefit if realized?' }
                ]
            },
            {
                category: 'Water/Biodiversity (E3, E4)',
                items: [
                    { question: 'Can we gain image benefits from water-saving processes?' },
                    { question: 'Can biodiversity action improve our reputation?' }
                ]
            },
            {
                category: 'Circular Economy (E5)',
                items: [
                    { question: 'Can circular practices strengthen our brand and efficiency?' },
                    { question: 'How large are the potential reputational and operational gains from circular design?' }
                ]
            },
            {
                category: 'Communities (S3)',
                items: [
                    { question: 'Do we use community investment to improve our reputation?' },
                    { question: 'How large is the potential benefit from positive community engagement?' }
                ]
            },
            {
                category: 'Consumers & Governance (S4, G1)',
                items: [
                    { question: 'How can stronger governance (clear product claims, data/privacy-by-design, accessible T&Cs) build consumer trust and unlock premium positioning?' },
                    { question: 'How large is the potential gain from stronger governance and consumer trust?' }
                ]
            }
        ],
        scoringGuide: {
            probability: [
                { label: 'Very likely', value: 1.0 },
                { label: 'Likely', value: 0.75 },
                { label: 'Could occur', value: 0.50 },
                { label: 'Rare', value: 0.25 },
                { label: 'N/A', value: 0 }
            ],
            impact: [
                { label: 'High', score: 4 },
                { label: 'Significant', score: 3 },
                { label: 'Moderate', score: 2 },
                { label: 'Low', score: 1 },
                { label: 'N/A', score: 0 }
            ]
        }
    })
}