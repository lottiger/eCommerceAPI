import express from 'express'
const router = express.Router()
import {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct} from '../controllers/productController.js'

router.get('/products', getAllProducts)
router.get('/product/:id', getProductById)
router.post('/product', createProduct)
router.put('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)






export default router