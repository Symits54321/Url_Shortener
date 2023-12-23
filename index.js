const dotenv = require('dotenv').config()

const port = 9000;

const express = require('express');
const session = require('express-session');
const app = express();
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


//session
const MongoStore = require('connect-mongodb-session')(session);


app.use(session({
    name: 'urlshortener',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            uri: 'mongodb+srv://sumitsingh3357:61gsxZQxqiFkzOz5@urlshortener-cluster.zonvzku.mongodb.net/?retryWrites=true&w=majority',
            autoRemove: 'disabled'
  
        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
  }));
    

// passport




app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


//cookie-parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//db (database)
const db = require('./config/mongoose');

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