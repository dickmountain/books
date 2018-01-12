var mongoose = require('mongoose'),
    Book = require('./models/book'),
    Comment = require('./models/comment');
    
var data = [
    { 
        name:'Красная книга Земли', 
        author:'Оксана Скалдина, Евгений Слиж',
        image:'http://ozon-st.cdn.ngenix.net/multimedia/c300/1008758003.jpg',
        description:'Мы предлагаем вам ближе познакомиться с удивительным миром животных нашей Земли, занесенных в Красную книгу. В популярном варианте издания собрана важная информация наиболее интересных представителях фауны нашей планеты, которым грозит опасность исчезновения, их распространении, внешнем виде, образе жизни и биологии.'
    },
    { 
        name:'Записки примата. Необычайная жизнь ученого среди павианов',
        author:'Роберт Сапольски',
        image:'http://ozon-st.cdn.ngenix.net/multimedia/1021173844.jpg',
        description:'Эта книга - воспоминания о более чем двадцати годах знакомства известного приматолога Роберта Сапольски с Восточной Африкой.'
    },
    { 
        name:'Руководство астронавта по жизни на Земле. Чему научили меня 4000 часов на орбите',
        author:'Крис Хэдфилд',
        image:'http://ozon-st.cdn.ngenix.net/multimedia/1011615162.jpg',
        description:'The New York Times бестселлер. Три месяца в топах Amazon.com. Миллионные продажи. '
    }
];
function seedDb(){ 
    Book.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            // data.forEach(function(seed){
            //   Book.create(seed, function(err, book){
            //       if(err){
            //           console.log(err); 
            //       }else{
            //           Comment.create(
            //               {
            //                   text:'Super!',
            //                   author:'Igor'
            //               },
            //               function(error, comment){
            //                   if(err){
            //                       console.log(err);
            //                   }else{
            //                       book.comments.push(comment);
            //                       book.save();
            //                   }
            //                 }
            //           );
            //       }
            //   }); 
            // });
        }
    });
}

module.exports = seedDb;