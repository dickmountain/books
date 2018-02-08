var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var middleware = require('../middleware');

router.get('/', function(request, response){
    Book.find({}, function(err, books){
        if(!err){
            response.render('books/index', {books:books});
        }
    });
});

router.post('/', middleware.isLoggedIn, function(request, response){
    var author = request.body.author;
    var image = request.body.image;
    var price = request.body.price;
    var description = request.body.description;
    var title = request.body.title;
    var creator = {
        id: request.user._id,
        username: request.user.username
    };
    Book.create({
        author: author,
        image: image,
        price:price,
        description: description,
        title: title,
        creator: creator
    }, function(err, book){
        if(!err){
            response.redirect('/books');
        }
    });
});

router.get('/new', middleware.isLoggedIn, function(request, response){
    response.render('books/new');
});

router.get('/:id', function(request, response){
    Book.findById(request.params.id).populate('comments').exec(function(err, book){ 
        if(!err){
            response.render('books/show', {book:book});
        }
    });
});

router.get('/:id/edit', middleware.isBookCreator, function(request, response){
    Book.findById(request.params.id, function(err, book){
        if(err){
            // flash possible
        }else{
            response.render('books/edit', { book:book });
        }
    });
});

router.put('/:id', middleware.isBookCreator, function(request, response){
    Book.findByIdAndUpdate(request.params.id, request.body.book, function(err, book){
        if(!err) response.redirect('/books/'+request.params.id);
    });
});

router.delete('/:id', middleware.isBookCreator, function(request, response){
    Book.findByIdAndRemove(request.params.id, function(err, book){
        if(!err) response.redirect('/books/');
    });
});

module.exports = router;