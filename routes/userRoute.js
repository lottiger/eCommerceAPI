import express from 'express'
const router = express.Router()
import {loginUser, getUserProfile, updateUserProfile, resgisterUser} from '../controllers/userController.js'
import { verifyToken } from '../middlewere/authMiddlewere.js'


router.post('/register', resgisterUser)
router.post('/login', loginUser)

router.get('/profile', verifyToken, getUserProfile)
router.put('/profile', verifyToken ,updateUserProfile)


export default router