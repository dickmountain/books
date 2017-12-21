var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    Book = require('./models/book'),
    Comment = require('./models/comment'),
    seedDb = require('./seeds');

seedDb();
mongoose.connect('mongodb://localhost/books', {
  useMongoClient: true
});

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static(__dirname + 'public'));

app.set('view engine', 'ejs');

app.get('/', function(request, result){
    result.render('landing');
});

app.get('/books', function(request, result){
    Book.find({}, function(err, books){
        if(!err){
            result.render('books/index', {books:books});
        }
    });
});

app.get('/books/new', function(request, result){
    result.render('books/new');
});

app.get('/books/:id', function(request, result){
    Book.findById(request.params.id).populate('comments').exec(function(err, book){ 
        if(!err){
            result.render('books/show', {book:book});
        }
    });
});

app.post('/books', function(request, result){
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
            result.redirect('/books');
        }
    });
});

app.get('/books/:id/comments/new', function(request, result){
    Book.findById(request.params.id, function(err, book){
        if(!err) result.render('comments/new', {book:book});
    });
});

app.post('/books/:id/comments', function(request, result){
    Book.findById(request.params.id, function(err, book){
        if(err){
           result.redirect('/books'); 
        }else{
            Comment.create(request.body.comment, function(err, comment){
                if(!err){
                    book.comments.push(comment);
                    book.save();
                    result.redirect('/books/'+book._id); 
                }
            })
        }
    });
});

app.listen(process.env.PORT, process.env.HOST, function(){
});