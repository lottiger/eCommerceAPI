import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

const mongoUri = process.env.MONGO_URI

const dbConnect = async () => {
  try {
    if(!mongoUri) throw new Error('Please define the MONGO_URI variable inside the .env file')
    const db = await mongoose.connect(mongoUri)
    console.log('DB connected');
  } catch (err) {
    console.log(err.message)
    process.exit(0)
  }
}

export default dbConnect


