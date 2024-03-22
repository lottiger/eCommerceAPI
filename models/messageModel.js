import {Schema, model} from 'mongoose'

const messageSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address']
    },
    message: {
        type: String,
        required: [true, 'Please enter your message']
    }
    

}, {timestamps: true})

const Message = model('Message', messageSchema)

export default Message