import {Schema, model, Types} from 'mongoose'

const OrderProduct = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})




const orderSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    products: [OrderProduct]
}, {
    timestamps: true

})

const Order = model('Order', orderSchema)

export default Order