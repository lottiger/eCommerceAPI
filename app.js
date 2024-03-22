import express from 'express'
import dbConnect from './server.js'
import messageRoute from './routes/messageRoute.js'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'


const app = express()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Server running on port: ' + PORT))

dbConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/ecommerce', messageRoute)
app.use('/api/ecommerce', productRoute)
app.use('/api/ecommerce', userRoute)

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});


//Lägg till en route för att hantera fel




export default app