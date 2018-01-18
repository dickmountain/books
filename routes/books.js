var express = require('express');
var router = express.Router();
var Book = require('../models/book');

router.get('/', function(request, response){
    Book.find({}, function(err, books){
        if(!err){
            response.render('books/index', {books:books});
        }
    });
});

router.post('/', isLoggedIn, function(request, response){
    var author = request.body.author;
    var image = request.body.image;
    var description = request.body.description;
    var title = request.body.title;
    var creator = {
        id: request.user._id,
        username: request.user.username
    };
    Book.create({
        author: author,
        image: image,
        description: description,
        title: title,
        creator: creator
    }, function(err, book){
        if(!err){
            response.redirect('/books');
        }
    });
});

router.get('/new', isLoggedIn, function(request, response){
    response.render('books/new');
});

router.get('/:id', function(request, response){
    Book.findById(request.params.id).populate('comments').exec(function(err, book){ 
        if(!err){
            response.render('books/show', {book:book});
        }
    });
});

function isLoggedIn(request, response, next){
    if(request.isAuthenticated()){
        return next();
    }
    response.redirect('/login');
} 

module.exports = router;