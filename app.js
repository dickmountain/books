var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    Book = require('./models/book'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDb = require('./seeds');

seedDb();
mongoose.connect('mongodb://localhost/books', {
  useMongoClient: true
});

app.use(require('express-session')({
    secret:'test',
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static(__dirname + '/public'));
app.use(function(request, response, next){
    response.locals.currentUser = request.user;
    next();
});

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');

app.get('/', function(request, response){
    response.render('landing');
});

app.get('/books', function(request, response){
    Book.find({}, function(err, books){
        if(!err){
            response.render('books/index', {books:books});
        }
    });
});

app.get('/books/new', function(request, response){
    response.render('books/new');
});

app.get('/books/:id', function(request, response){
    Book.findById(request.params.id).populate('comments').exec(function(err, book){ 
        if(!err){
            response.render('books/show', {book:book});
        }
    });
});

app.post('/books', function(request, response){
    var author = request.body.author;
    var image = request.body.image;
    var description = request.body.description;
    var title = request.body.title;
   
    Book.create({
        author:author,
        image:image,
        description:description,
        title:title
    }, function(err, book){
        if(!err){
            response.redirect('/books');
        }
    });
});

app.get('/books/:id/comments/new', isLoggedIn, function(request, response){
    Book.findById(request.params.id, function(err, book){
        if(!err) response.render('comments/new', {book:book});
    });
});

app.post('/books/:id/comments', isLoggedIn, function(request, response){
    Book.findById(request.params.id, function(err, book){
        if(err){
           response.redirect('/books'); 
        }else{
            Comment.create(request.body.comment, function(err, comment){
                if(!err){
                    book.comments.push(comment);
                    book.save();
                    response.redirect('/books/'+book._id); 
                }
            })
        }
    });
});

app.get('/register', function(request, response){
    response.render('register');
});
app.post('/register', function(request, response){
    var newUser = new User({ username:request.body.username });
    User.register(newUser, request.body.password, function(err, user){
        if(!err){
            passport.authenticate('local')(request, response, function(){
                response.redirect('/books');
            });
        }else{
            return response.render('register');
        }
    });
});

app.get('/login', function(request, response){
    response.render('login');
});

app.post('/login',  passport.authenticate('local', {
    successRedirect:'/books', 
    failureRedirect:'/login' 
}), function(request, response){});

app.get('/logout', function(request, response){
    request.logout();
    response.redirect('/books');
});

function isLoggedIn(request, response, next){
    if(request.isAuthenticated()){
        return next();
    }
    response.redirect('/login');
}

app.listen(process.env.PORT, process.env.HOST, function(){});