const { model, Schema } = require('mongoose')


// console.log("all", id, name, imgURL, size, weidht, count, discription)

const Item = new Schema({
    name: { type: String, required: true },
    imgURL: { type: String, required: true },
    size: { type: String, required: true },
    weidht: { type: String, required: true },
    count: { type: String, required: true },
    discription: { type: String, required: true },
    comments: []
})

module.exports = model('Item', Item)