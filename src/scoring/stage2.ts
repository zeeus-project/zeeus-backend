const impactMap: Record<string, number> = {
    'Low': 1,
    'Moderate': 2,
    'Significant': 3,
    'High': 4,
    'N/A': 0
    }


function getRating(score: number): string {
        if (score >= 3.0) return 'High'
        if (score >= 2.0) return 'Medium'
        if (score >= 1) return 'Low'
        if (score < 1) return 'Negligible'
        return 'N/A'
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
    const rating = getRating(riskScore)

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
    const rating = getRating(opportScore)

    return { opportScore, rating }
}

