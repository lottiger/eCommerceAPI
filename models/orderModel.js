import {Schema, model, Types} from 'mongoose'

const orderSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
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
}, {
    timestamps: true

})

const Order = model('Order', orderSchema)

export default Order