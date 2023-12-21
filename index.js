const dotenv = require('dotenv').config()

const port = 9000;

const express = require('express');

const app = express();

//db (database)

// path requiring
const path = require('path');

//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//static files
app.use(express.static('assets'));

// EJS
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//routes
app.use('/',require('./routes/index'));


// Listening
app.listen(port,function(err){
    if(err){
        console.log('not able to listen port');
    }
    console.log(`URLSHORTENING API is Listening to port:${port}`);
   
});