import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import itemRoutes from './routes/itemRoutes.js'

dotenv.config({ quiet: true })

const app = express()
const port = process.env.PORT || 5000

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/items', itemRoutes)


app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running.' })
})

async function startServer() {
  try {
    await connectDB()

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch {
    console.error('Could not connect to MongoDB. Check MONGO_URI in backend/.env and make sure MongoDB is running.')
    process.exit(1)
  }
}

startServer()
