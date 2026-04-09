const impactMap: Record<string, number> = {
    'Low': 1,
    'Moderate': 2,
    'Significant': 3,
    'High': 4,
    'N/A': 0
    }


function getRatingRisk(score: number): string {
        if (score >= 3.0) return 'Critical'
        if (score >= 2.0) return 'Severe'
        if (score >= 1) return 'Moderate'
        if (score < 1 && score > 0) return 'Sustainable'
        return 'Neutral'
    }

function getRatingOpportunity(score: number): string {
        if (score >= 3.0) return 'Great'
        if (score >= 2.0) return 'Sustainable'
        if (score >= 1) return 'Reasonable'
        if (score < 1 && score > 0 ) return 'Small'
        return 'Neutral'
    }



export const calculateRiskScore = (
    probability: string,
    impact: string,
): { riskScore: number, rating: string } => {

    const probabilityMap: Record<string, number> = {
    'N/A' : 0.0,
    'Rare' : 0.25, 
    'Could occur' : 0.50, 
    'Likely' : 0.75, 
    'Very likely' : 1.0
    }

    const Impact = impactMap[impact] || 0
    const Probability = probabilityMap[probability] || 0

    const riskScore = Impact * Probability
    const rating = getRatingRisk(riskScore)

    return { riskScore, rating }
}



export const calculateOpportunityScore = (
    likelihood: string,
    impact: string,
): { opportScore: number, rating: string } => {

    const likelihoodMap: Record<string, number> = {
    'N/A' : 0.0,
    'Rare' : 0.25, 
    'Could occur' : 0.50, 
    'Likely' : 0.75, 
    'Very likely' : 1.0
    }

    const Impact = impactMap[impact] || 0
    const Likelihood = likelihoodMap[likelihood] || 0

    const opportScore = Impact * Likelihood
    const rating = getRatingOpportunity(opportScore)

    return { opportScore, rating }
}

