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
var reservation = {
name: "",
email: "",
phone: "",
id: "",
accepted: true
};

var waitList = {
name: "",
email: "",
phone: "",
id: "",
accepted: true
};

//var reservationList = "";


//Basic Routes (html pages)
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/tables", function(req, res){
    res.sendFile(path.join(__dirname, "tables.html"));
    return res.json(reservation, waitList);
});

app.get("/reserve", function(req, res){
    res.sendFile(path.join(__dirname, "reserve.html"));

});

//Create new reservation
app.post("/api/new", function(req, res){
    var newReservation = req.body;

    console.log(newReservation);

    var found = false;
    var place = "";

    for (var i = 0; i < reservation.length && !found; i++){
        if (newReservation.id === reservation[i].id){
            found = true;
            place = "reservation";
        }
    }
    for (var i = 0; i < waitList.length && !found; i++){
        if (newReservation.id === waitList[i].id)
        {
            found = true;
            place = "wait";
        }
    }
if (found) {
    newReservation.accepted = false;
    newReservation.place = place;
}
else {
    newReservation.accepted = true;
    if (reservation.length < 5) {
        newReservation.place = "reservation";
        reservation.push(newReservation);
    }
    else {
        newReservation.place = "wait";
        waitList.push(newReservation);
    }
}
res.json(newReservation);
});

app.post('/api/confirm', function(req, res) {
    var reservationUsed = req.body.id;
    console.log(reservationUsed);

    for (var i = 0; i < reservation.length; i++) {
        if (reservationUsed === reservation[i].id) {
            if (waitList.length > 0) {
                reservation[i]=waitList[0];
                waitList.splice(0,1);
            }
            else {
                reservation.splice(i, 1)
            }
        }
    }
    res.send("Reservation Used");
})

//start server

app.listen(PORT, function() {
    console.log("App is listening on PORT " + PORT);
});
