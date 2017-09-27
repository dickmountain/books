var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();

mongoose.connect('mongodb://localhost/books', {
  useMongoClient: true
});
var bookSchema = new mongoose.Schema({
    author:String,
    image:String,
    description:String
});
var Book = mongoose.model('Book', bookSchema);

app.use(bodyParser.urlencoded({
    extended:true
}));
app.set('view engine', 'ejs');

app.get('/', function(request, result){
    result.render('landing');
});

app.get('/books', function(request, result){
    Book.find({}, function(err, books){
        if(!err){
            result.render('index', {books:books});
        }
    });
});

app.get('/books/new', function(request, result){
    result.render('new');
});

app.get('/books/:id', function(request, result){
    Book.findById(request.params.id, function(err, book){
        if(!err){
            result.render('show', {book:book});
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

app.listen(process.env.PORT, process.env.HOST, function(){
    
});