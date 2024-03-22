import jwt from 'jsonwebtoken'

const generateToken = (User) => {
    return jwt.sign({id: User._id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

export default generateToken