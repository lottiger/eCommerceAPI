import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

const resgisterUser = asyncHandler(async (req, res) => {
    const {firstName, lastName, email, password} = req.body

    if (!firstName || !lastName || !email || !password) {
        res.status(400)
        throw new Error('First name, last name, email and password are required')
    }

    const userExists = await User.exists({email})
    if (userExists) {
        res.status(400)
        throw new Error('User email already exists')
    }

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password
    })

    const token = generateToken(newUser)

    res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        fullName: newUser.fullName,
        token
    })

})

const loginUser = asyncHandler(async (req, res) => {
    
    const {email, password} = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('email and password are required')
    }

    const user = await User.findOne({email})

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    const result = await user.matchPassword(password)

    if (!result) {
        res.status(401)
        throw new Error('Invalid email or password')
    }


    res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        fullName: user.fullName,
        token: generateToken(user)
    })

})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId)

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        fullName: user.fullName
    })
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId)
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName

    if (req.body.email) {
        const userExists = await User.exists({email: req.body.email})
        if (userExists) {
            res.status(400)
            throw new Error('User email already exists')
        }
        user.email = req.body.email
    }

    if (req.body.password) {
        user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(200).json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        fullName: updatedUser.fullName
    })
})

export {resgisterUser, loginUser, getUserProfile, updateUserProfile}