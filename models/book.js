var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    author:String,
    image:String,
    description:String
});
module.exports = mongoose.model('Book', bookSchema);