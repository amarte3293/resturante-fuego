//Dependecies (Express, body parser, path)

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


//Set up Express app (app and PORT)

var app = express();
var PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Create Data Variables


//Basic Routes (html pages)
//display reservation
//Create new reservation


//start server

app.listen(PORT, function() {
    console.log("App is listening on PORT " + PORT);
});
