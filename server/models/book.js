let mongoose = require('mongoose');

//Book Schema
let bookSchema = mongoose.Schema({
    isbn: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumb: {
        type: String
    }
});

let Book = module.exports = mongoose.model('Book', bookSchema);