const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');

//Init App
const app = express();

//connecting to database
mongoose.connect(config.database);
let db = mongoose.connection;

//Check Connection 
db.once('open', () => console.log('Connected to MongoDB'))

//Check For DB errors
db.on('error', (err) => console.log(err));

//Bring in Models
let Book = require('./models/book');

// parse application/json
app.use(bodyParser.json());

//using static files
app.use(express.static('../app'));

//serving the application
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '../app/index.html'));
})

//setting port variable
const port = process.env.port || 4000;

//initializing the server
app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`);
});