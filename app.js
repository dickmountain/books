var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

var books = [
        {author:'Владимир Познер', image:'https://ozon-st.cdn.ngenix.net/multimedia/1012171211.jpg'},
        {author:'Richard Dawkins', image:'https://ozon-st.cdn.ngenix.net/multimedia/1012171212.jpg'},
        {author:'Владимир Познер', image:'https://ozon-st.cdn.ngenix.net/multimedia/1012171213.jpg'}
];

app.get('/', function(request, result){
    result.render('landing');
});

app.get('/', function(request, result){
    result.render('landing');
});

app.get('/books', function(request, result){
    result.render('books', {books:books});
});

app.get('/books/new', function(request, result){
    result.render('new');
});

app.post('/books', function(request, result){
    var author = request.body.author;
    var image = request.body.image;
    books.push({author:author, image:image});
    
    result.redirect('/books');
});

app.listen(process.env.PORT, process.env.HOST, function(){
    
});