import express from 'express'
const router = express.Router()
import {createMessage} from '../controllers/messageController.js'

router.post('/message', createMessage)


export default router