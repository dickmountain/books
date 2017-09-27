var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();

mongoose.connect('mongodb://localhost/books', {
  useMongoClient: true
});
var bookSchema = new mongoose.Schema({
    author:String,
    image:String
});
var Book = mongoose.model('Book', bookSchema);

app.use(bodyParser.urlencoded({
    extended:true
}));
app.set('view engine', 'ejs');

app.get('/', function(request, result){
    result.render('landing');
});

app.get('/', function(request, result){
    result.render('landing');
});

app.get('/books', function(request, result){
    Book.find({}, function(err, books){
        if(!err){
            result.render('books', {books:books});
        }
    });
});

app.get('/books/new', function(request, result){
    result.render('new');
});

app.post('/books', function(request, result){
    var author = request.body.author;
    var image = request.body.image;
   
   Book.create({
       author:author,
       image:image
   }, function(err, book){
       if(!err){
           result.redirect('/books');
       }
   });
});

app.listen(process.env.PORT, process.env.HOST, function(){
    
});