import {Schema, model} from 'mongoose'

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    category: {
        type: String,
        required: [true, 'Please enter product category']
    },
    
    images: {
        type: [String],
        required: [true, 'Please enter product image URL']
    }
}, {timestamps: true})

const Product = model('Product', productSchema)

export default Product






// import {Schema, model} from 'mongoose'

// const productSchema = new Schema({
//     name: {
//         type: String,
//         required: [true, 'Please enter product name']
//     },
//     price: {
//         type: Number,
//         required: [true, 'Please enter product price']
//     },
//     description: {
//         type: String,
//         required: [true, 'Please enter product description']
//     },
//     category: {
//         type: String,
//         required: [true, 'Please enter product category']
//     },
    
//     imageUrl: {
//         type: String,
//         required: [true, 'Please enter product image URL']
//     }
// }, {timestamps: true})

// const Product = model('Product', productSchema)

// export default Product