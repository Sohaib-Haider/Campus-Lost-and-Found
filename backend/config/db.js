import mongoose from 'mongoose'


async function connectDB() {
  if (!process.env.MONGO_URI) {
    throw new Error('Add MONGO_URI to the backend .env file.')
  }

  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })

  console.log('MongoDB connected.')
}

export default connectDB
