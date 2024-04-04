import express from 'express'
const router = express.Router()
import { authenticateOptional } from '../middlewere/orderMiddlewere.js'
import { createOrder, getAllOrders, getOrderById } from '../controllers/orderController.js'
import { verifyToken } from '../middlewere/authMiddlewere.js'

router.post('/', authenticateOptional, createOrder)
router.get('/orders', verifyToken, getAllOrders)
router.get ('/:id', verifyToken, getOrderById)

export default router