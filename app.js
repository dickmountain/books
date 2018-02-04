var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    Book = require('./models/book'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDb = require('./seeds');

var booksRoutes = require('./routes/books'),
    commentRoutes = require('./routes/comments'),
    indexRoutes = require('./routes/index');

// seedDb();
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
app.use(flash());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static(__dirname + '/public'));
app.use(function(request, response, next){
    response.locals.currentUser = request.user;
    response.locals.error = request.flash('error');
    response.locals.success = request.flash('success');
    next();
});
app.use(methodOverride('_method'));
app.use('/books', booksRoutes);
app.use('/books/:id/comments', commentRoutes);
app.use('/', indexRoutes);

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');

app.listen(process.env.PORT, process.env.HOST, function(){});