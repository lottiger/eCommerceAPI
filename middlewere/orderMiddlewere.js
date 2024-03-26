import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'

const authenticateOptional = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]

        console.log('Token:', token) // logga token

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.userId).select('-password')
    
        console.log('User:', req.user) // logga användaren
    }

    
        next()
    
})

export { authenticateOptional }