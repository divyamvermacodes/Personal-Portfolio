import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import connectDB from './config/db.js'
import contactRoutes from './routes/contactRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 5000

// --- Middleware ---
app.use(helmet())
app.use(express.json({ limit: '10kb' }))

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  })
)

// --- Routes ---
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is healthy', timestamp: new Date().toISOString() })
})

app.use('/api/contact', contactRoutes)

// --- Error handling (must be last) ---
app.use(notFound)
app.use(errorHandler)

// --- Start ---
async function start() {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

start()
