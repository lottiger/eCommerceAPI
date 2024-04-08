import Product from '../models/productModel.js'
import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'

const getAllProducts = asyncHandler(async (req, res) => {
   
        const products = await Product.find({})
       
        if (!products) {
            res.status(404)
            throw new Error('Products not found')
        }

        res.json(products)
   
})

const getProductById = asyncHandler(async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400)
        throw new Error('Invalid product ID')
    }
        const product = await Product.findById(req.params.id)

        if (!product) {
            res.status(404)
            throw new Error('Product not found')
        }

        res.json(product)
   

})

const createProduct = asyncHandler(async (req, res) => {
   
       const {name, price, description, category, images} = req.body

       if (!name || !price || !description || !category || !images || !Array.isArray(images)) {
           res.status(400)
           throw new Error('name, price, description, category and images (as an array) are required')
       }

         const newProduct = new Product({
              name,
              price,
              description,
              category,
              images
         })

         await newProduct.save()
         
         if (!newProduct) { 
             res.status(500)
             throw new Error('Product not created')
         }

         res.status(201).json(newProduct)
   
})

const updateProduct = asyncHandler(async (req, res) => {
  
        const {name, price, description, category, images} = req.body

        const product = await Product.findById(req.params.id)

        if (!product) {
            res.status(404)
            throw new Error('Product not found')
        }

        if (name !== undefined) product.name = name
        if (price !== undefined) product.price = price
        if (description !== undefined) product.description = description
        if (category !== undefined) product.category = category
        if (images !== undefined && Array.isArray(images)) product.images = images

        const updatedProduct = await product.save()

        if (!updatedProduct) {
            res.status(500)
            throw new Error('Product not updated')
        }

        res.json(updatedProduct)
   
})

const deleteProduct = asyncHandler(async (req, res) => {
    
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
 
})

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct}


// import Product from '../models/productModel.js'
// import mongoose from 'mongoose'
// import asyncHandler from 'express-async-handler'

// const getAllProducts = asyncHandler(async (req, res) => {
   
//         const products = await Product.find({})
       
//         if (!products) {
//             res.status(404)
//             throw new Error('Products not found')
//         }

//         res.json(products)
   
// })

// const getProductById = asyncHandler(async (req, res) => {

//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         res.status(400)
//         throw new Error('Invalid product ID')
//     }
//         const product = await Product.findById(req.params.id)

//         if (!product) {
//             res.status(404)
//             throw new Error('Product not found')
//         }

//         res.json(product)
   

// })

// const createProduct = asyncHandler(async (req, res) => {
   
//        const {name, price, description, category, imageUrl} = req.body

//        if (!name || !price || !description || !category || !imageUrl) {
//            res.status(400)
//            throw new Error('name, price, description, category and imageUrl are required')
//        }

//          const newProduct = new Product({
//               name,
//               price,
//               description,
//               category,
//               imageUrl
//          })

//          await newProduct.save()
         
//          if (!newProduct) { 
//              res.status(500)
//              throw new Error('Product not created')
//          }

//          res.status(201).json(newProduct)
   
// })

// const updateProduct = asyncHandler(async (req, res) => {
  
//         const {name, price, description, category, imageUrl} = req.body

//         const product = await Product.findById(req.params.id)

//         if (!product) {
//             res.status(404)
//             throw new Error('Product not found')
//         }

//         if (name !== undefined) product.name = name
//         if (price !== undefined) product.price = price
//         if (description !== undefined) product.description = description
//         if (category !== undefined) product.category = category
//         if (imageUrl !== undefined) product.imageUrl = imageUrl

//         const updatedProduct = await product.save()

//         if (!updatedProduct) {
//             res.status(500)
//             throw new Error('Product not updated')
//         }

//         res.json(updatedProduct)
   
// })

// const deleteProduct = asyncHandler(async (req, res) => {
    
//        const id = req.params.id
//        if(!mongoose.isValidObjectId(id)) {
//            res.status(400)
//            throw new Error('Invalid product id')
//        }
//          const product = await Product.findByIdAndDelete(id)

//             if (!product) {
//                 res.status(404)
//                 throw new Error('Product not found')
//             }
//             res.status(200).json({message: 'Product deleted', product})
 
// })

// export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct}




