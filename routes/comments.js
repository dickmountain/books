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

router.get('/:comment_id/edit', function(request, response){
    Comment.findById(request.params.comment_id, function(err, comment){
        if(err){
            response.redirect('back');
        }else{
            response.render('comments/edit', { book_id: request.params.id, comment:comment });
        }
    });
});

router.put('/:comment_id', function(request, response){
    Comment.findByIdAndUpdate(request.params.comment_id, request.body.comment, function(err, comment){
        if(err){
            response.redirect('back');
        }else{
            response.redirect('/books/'+request.params.id);
        }
    });
})

router.delete('/:comment_id', function(request, response){
    Comment.findByIdAndRemove(request.params.comment_id, function(err){
        if(err){
            response.redirect('back');
        }else{
            response.redirect('/books/'+request.params.id);
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