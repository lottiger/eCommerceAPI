import {Schema, model} from 'mongoose'

const orderSchema = new Schema({
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})

const Order = model('Order', orderSchema)

export default Order