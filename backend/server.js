import express from 'express'


const app = express()
const port = 5000

app.use(express.json())


app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running.' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
