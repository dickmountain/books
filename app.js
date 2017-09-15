var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(request, result){
    result.render('landing');
});

app.get('/', function(request, result){
    result.render('landing');
});

app.get('/books', function(request, result){
    var books = [
        {author:'Владимир Познер', image:'https://ozon-st.cdn.ngenix.net/multimedia/1012171211.jpg'},
        {author:'Richard Dawkins', image:'https://ozon-st.cdn.ngenix.net/multimedia/1012171212.jpg'},
        {author:'Владимир Познер', image:'https://ozon-st.cdn.ngenix.net/multimedia/1012171213.jpg'}
    ];
    
    result.render('books', {books:books});
});

app.listen(process.env.PORT, process.env.HOST, function(){
    
});