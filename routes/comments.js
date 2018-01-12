var express = require('express');
var router = express.Router({ mergeParams:true });
var Book = require('../models/book');
var Comment = require('../models/comment');

router.get('/new', isLoggedIn, function(request, response){
    Book.findById(request.params.id, function(err, book){
        if(!err) response.render('comments/new', {book:book});
    });
});

router.post('/', isLoggedIn, function(request, response){
    Book.findById(request.params.id, function(err, book){
        if(err){
           response.redirect('/books'); 
        }else{
            Comment.create(request.body.comment, function(err, comment){
                if(!err){
                    comment.author.id = request.user._id;
                    comment.author.username = request.user.username;
                    comment.save();
                
                    book.comments.push(comment);
                    book.save();
                    response.redirect('/books/'+book._id); 
                }
            })
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