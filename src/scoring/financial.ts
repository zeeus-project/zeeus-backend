export const calculateFinancialScore = (
    isEvaluated: boolean,
    rating: string
): number => {

    if (!isEvaluated) return 0

    const ratingMap: Record<string, number> = {
        'Not Evaluated': 0,
        'Below Industry Average': 1,
        'Average / No Benchmark': 2,
        'Above Industry Average': 3,
        // Sensitivity Analysis
        'High Volatility / Large Sensitivity': 1,
        'Moderate Volatility': 2,
        'Low Volatility / Stable': 3,
        // USP / Strategic Fit
        'No USP': 1,
        'Weak / Moderate USP': 2,
        'Strong / Unique USP': 3,
        // Market Growth
        'Shrinking': 1,
        'Mature': 2,
        'Growing': 3
    }

    return ratingMap[rating] || 0
}