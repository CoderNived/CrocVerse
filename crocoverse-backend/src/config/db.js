import mongoose from 'mongoose'
import env from './env.js'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      // Mongoose 6+ defaults are usually fine, but keeping explicit for clarity
      serverSelectionTimeoutMS: 5000, // fail fast if DB not reachable
    })

    console.log(`✅ MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`)

    // Optional: more verbose logging in development
    if (env.NODE_ENV === 'development') {
      console.error(error)
    }

    process.exit(1) // fail fast
  }
}

export default connectDB