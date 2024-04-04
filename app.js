import express from 'express'
import cors from 'cors'
import dbConnect from './server.js'
import messageRoute from './routes/messageRoute.js'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import { errorHandler, notFound } from './middlewere/errorMiddlewere.js'


const app = express()

app.use(cors())

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Server running on port: ' + PORT))

dbConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/ecommerce', messageRoute)
app.use('/api/ecommerce', productRoute)
app.use('/api/ecommerce', userRoute)
app.use('/api/ecommerce', orderRoute)


app.use(notFound, errorHandler)







export default app