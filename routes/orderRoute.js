import express from 'express'
const router = express.Router()
import { authenticateOptional } from '../middlewere/orderMiddlewere.js'
import { createOrder, getAllOrders, getOrderById } from '../controllers/orderController.js'
import { verifyToken } from '../middlewere/authMiddlewere.js'

router.route('/order').post(authenticateOptional, createOrder)
router.route('/orders').get(verifyToken, getAllOrders)
router.route('/order/:id').get(verifyToken, getOrderById)

export default router