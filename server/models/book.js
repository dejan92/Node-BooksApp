let mongoose = require('mongoose');

//Book Schema
let bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean
    },
    thumb: {
        type: String
    }
});

let Book = module.exports = mongoose.model('Book', bookSchema);