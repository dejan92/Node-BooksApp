const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

//Init App
const app = express();

//connecting to database
//, { useNewUrlParser: true }
mongoose.connect(config.database);
let db = mongoose.connection;

//Check Connection 
db.once('open', () => console.log('Connected to MongoDB'))

//Check For DB errors
db.on('error', (err) => console.log(err));

//Bring in Models
let Book = require('./models/book');

//Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

//using static files
app.use(express.static(path.join(__dirname, '../app')));

//Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//Pasport Config
require('./config/passport')(passport);

//Passport MIddleware
app.use(passport.initialize());
app.use(passport.session());

//initialize global variable user
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//Home Route
app.get('/', (req, res) => {
    Book.find({}, (err, books) => {
        if (err) {
            console.log(err);
        } else {
            res.sendFile(path.join(__dirname, '../app/index.html'));
        }
    });

});

//Route Files
let books = require('./routes/books');
let users = require('./routes/users');
app.use('/books', books);
app.use('/users', users);

//serving the application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/index.html'));
})

//setting port variable
const port = process.env.port || 4000;

//initializing the server
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});