
export const calculateMaterialityScore = (
    magnitude: string,
    scale: string,
    irreversibility: string,
    likelihood: string
): { score: number, isMaterial: boolean } => {

    const magnitudeMap: Record<string, number> = {
    'Low': 1,
    'Moderate': 2,
    'Significant': 3,
    'High': 4,
    'N/A': 0
    }

    const likelihoodMap: Record<string, number> = {
    'Very unlikely' : 0.25, 
    'Unlikely' : 0.50, 
    'Likely' : 0.75, 
    'Very likely' : 1.0
    }

    const Magnitude = magnitudeMap[magnitude] || 0
    const Likelihood = likelihoodMap[likelihood] || 0
    const Scale = magnitudeMap[scale] || 0
    const Irreversibility = magnitudeMap[irreversibility] || 0

    const score = ((Magnitude + Scale + Irreversibility) / 3) * Likelihood
    const isMaterial = score >= 2.0

    return { score, isMaterial }


}