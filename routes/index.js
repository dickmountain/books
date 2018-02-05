var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.get('/', function(request, response){
    response.render('landing');
});

router.get('/register', function(request, response){
    response.render('register');
});

router.post('/register', function(request, response){
    var newUser = new User({ username:request.body.username });
    User.register(newUser, request.body.password, function(err, user){
        if(!err){
            passport.authenticate('local')(request, response, function(){
                response.redirect('/books');
            });
        }else{
            request.flash('error', err.message);
            
            return response.render('register');
        }
    });
});

router.get('/login', function(request, response){
    response.render('login');
});

router.post('/login',  passport.authenticate('local', {
    successRedirect:'/books', 
    failureRedirect:'/login' 
}), function(request, response){});

router.get('/logout', function(request, response){
    request.logout();
    
    request.flash('success', 'You are logged out.');
    response.redirect('/books');
});

module.exports = router;