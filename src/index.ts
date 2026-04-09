import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import evalRoutes from './routes/evaluations'
import primaryDataRoutes from './routes/primaryData'
import stage1Routes from './routes/stage1'
import stage2Routes from './routes/stage2'
import financialRoutes from './routes/financial'
import sdgRoutes from './routes/sdg'
import resultsRoutes from './routes/results'
import recommendationsRoutes from './routes/recommendations'
import aiRecommendationsRoutes from './routes/aiRecommendations'
import calculateRoutes from './routes/calculate'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/evaluations', evalRoutes)
app.use('/evaluations', primaryDataRoutes)
app.use('/evaluations', stage1Routes)
app.use('/evaluations', stage2Routes)
app.use('/evaluations', financialRoutes)
app.use('/evaluations', sdgRoutes)
app.use('/evaluations', resultsRoutes)
app.use('/evaluations', recommendationsRoutes)
app.use('/evaluations', aiRecommendationsRoutes)
app.use('/calculate', calculateRoutes)
app.use(cors())


// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})