import Message from '../models/messageModel.js'

const createMessage = async (req, res) => {
    try {
       const {name, email, message} = req.body

       if (!name || !email || !message) {
           res.status(400)
           throw new Error('Please fill in all fields')
       }

         const newMessage = new Message({
              name,
              email,
              message
         })

         await newMessage.save()
         
         if (!newMessage) {
             res.status(500)
             throw new Error('Message not sent')
         }

         res.status(201).json(newMessage)
    } catch (error) {
        res.json({message: error.message})
        
    }
}

export {createMessage}
