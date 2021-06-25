const { model, Schema } = require('mongoose')


const Comment = new Schema({
    productId: { type: String, required: true },
    description: { type: String, required: true },
    data: { type: String, required: true },
    author: { type: String, required: true },
})

module.exports = model('Comment', Comment)