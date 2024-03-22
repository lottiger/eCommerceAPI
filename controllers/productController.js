import Product from '../models/productModel.js'
import mongoose from 'mongoose'

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})

        res.json(products)
    } catch (error) {
        res.json({message: error.message})
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            res.status(404)
            throw new Error('Product not found')
        }

        res.json(product)
    } catch (error) {
        res.json({message: error.message})
    }

}

const createProduct = async (req, res) => {
    try {
       const {name, price, description, category, imageUrl} = req.body

       if (!name || !price || !description || !category || !imageUrl) {
           res.status(400)
           throw new Error('Please fill in all fields')
       }

         const newProduct = new Product({
              name,
              price,
              description,
              category,
              imageUrl
         })

         await newProduct.save()
         
         if (!newProduct) { 
             res.status(500)
             throw new Error('Product not created')
         }

         res.status(201).json(newProduct)
    } catch (error) {
        res.json({message: error.message})
        
    }
}

const updateProduct = async (req, res) => {
    try {
        const {name, price, description, category, imageUrl} = req.body

        const product = await Product.findById(req.params.id)

        if (!product) {
            res.status(404)
            throw new Error('Product not found')
        }

        if (name !== undefined) product.name = name
        if (price !== undefined) product.price = price
        if (description !== undefined) product.description = description
        if (category !== undefined) product.category = category
        if (imageUrl !== undefined) product.imageUrl = imageUrl

        const updatedProduct = await product.save()

        if (!updatedProduct) {
            res.status(500)
            throw new Error('Product not updated')
        }

        res.json(updatedProduct)
    } catch (error) {
        res.json({message: error.message})
    }
}

const deleteProduct = async (req, res) => {
    try {
       const id = req.params.id
       if(!mongoose.isValidObjectId(id)) {
           res.status(400)
           throw new Error('Invalid product id')
       }
         const product = await Product.findByIdAndDelete(id)

            if (!product) {
                res.status(404)
                throw new Error('Product not found')
            }
            res.status(200).json({message: 'Product deleted', product})
} catch (error){
    // res.status(500).json({ error: error.toString() })
    res.json({message: error.message})
}
}

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct}