import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        //kolla hur det går med userId _
        next()
    } catch (error) {
        
        res.status(401)
        let message = 'Access denied, please login'

        if (error.name === 'TokenExpiredError') {
            message = 'Session expired, please login again'
        }
        throw new Error(message)
    }
}

export { verifyToken }