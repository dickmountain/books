var Book = require('../models/book');
var Comment = require('../models/comment');

var middleware = {};

middleware.isLoggedIn = function(request, response, next){
    if(request.isAuthenticated()){
        return next();
    }
    
    response.flash('error', 'You need to be signed in');
    
    response.redirect('/login');
}

middleware.isBookCreator = function(request, response, next){
    if(request.isAuthenticated()){
        Book.findById(request.params.id, function(err, book){ 
            if(!err){
                if(book.creator.id.equals(request.user._id)){
                   next();
                }
            }else{
                response.redirect('back');
            }
        });
    }else{
        response.redirect('back');
    } 
}

middleware.isCommentCreator = function(request, response, next){
    if(request.isAuthenticated()){
        Comment.findById(request.params.comment_id, function(err, comment){ 
            if(!err){
                if(comment.author.id.equals(request.user._id)){
                   next();
                }
            }else{
                response.redirect('back');
            }
        });
    }else{
        response.redirect('back');
    }   
}

module.exports = middleware;