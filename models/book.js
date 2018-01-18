var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    author:String,
    name:String,
    image:String,
    description:String,
    creator:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
});

module.exports = mongoose.model('Book', bookSchema);