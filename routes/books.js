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

router.get('/:id/edit', isBookCreator, function(request, response){
    Book.findById(request.params.id, function(err, book){
        if(!err) response.render('books/edit', {book:book});
    });
});

router.put('/:id', isBookCreator, function(request, response){
    Book.findByIdAndUpdate(request.params.id, request.body.book, function(err, book){
        if(!err) response.redirect('/books/'+request.params.id);
    });
});

router.delete('/:id', isBookCreator, function(request, response){
    Book.findByIdAndRemove(request.params.id, function(err, book){
        if(!err) response.redirect('/books/');
    });
});

function isBookCreator(request, response, next){
    if(request.isAuthenticated()){
        Book.findById(request.params.id).populate('comments').exec(function(err, book){ 
            if(!err){
                if(book.creator.id.equals(request.user._id)){
                   next() 
                }
            }else{
                response.redirect('back');
            }
        });
    }else{
        response.redirect('back');
    }   
}

function isLoggedIn(request, response, next){
    if(request.isAuthenticated()){
        return next();
    }
    response.redirect('/login');
} 

module.exports = router;