import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema ({

    firstName: {
        type: String,
        required: [true, 'Please enter your first name']
    },

    lastName: {
        type: String,
        required: [true, 'Please enter your last name']
    },

    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Please enter your password']
    },
}, {timestamps: true})

userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`  
    // return this.firstName + ' ' + this.lastName
})

userSchema. methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
})

const User = model('User', userSchema)

export default User