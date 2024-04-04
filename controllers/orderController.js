




import Order from '../models/orderModel.js'
import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'

const createOrder = asyncHandler(async (req, res) => {
    const {products} = req.body
    if (!products || products.length === 0) {
        res.status(400)
        throw new Error('No products in order')
    }
    const newOrder = new Order({
        user: req.user?._id,
        products
    })
    await newOrder.save()

    if (!newOrder) {
        res.status(500)
        throw new Error('Order not created')
    }

    res.status(201).json(newOrder)
})



const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.userId }).populate('products.productId') // populate('products.productId') - hämtar produkterna i ordern
    
    if (!orders) {
        res.status(404)
        throw new Error('Orders not found')
    }
    res.json(orders)
})

const getOrderById = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400)
        throw new Error('Invalid order ID')
    }
    const order = await Order.findById(req.params.id).populate('user', 'firstName') //kanske ska vata fullNamne istället för email
    if (!order) {
        res.status(404)
        throw new Error('Order not found')
    }
    res.json(order)
})





export {getAllOrders, getOrderById, createOrder}