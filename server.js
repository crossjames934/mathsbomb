// Dependencies
const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const socket = require('socket.io');
const shortid = require('shortid');
const app = express();

// Connect to Database
mongoose.connect(process.env.DB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to Database! :D");
});

// Schema and Models
const roomSchema = new mongoose.Schema({
    groupName: String,
    id: String,
    pin: String,
    entryPassword: String,
    unixTimestamp: Number
});
const Room = mongoose.model('Room', roomSchema);

// Server files and basic app usage
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Home page
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

// Routes
app.route('/hostSetup/')
    .post((req, res) => {
        // Get all existing IDs of rooms to make sure we don't generate a duplicate one
        Room.find((err, docs) => {
            if (err) return console.error(err);
            const existingIDs = docs.map(doc => doc.id);
            const pinMultiplier = 1000000;
            // Keep generating new number until we get one that doesn't already exist
            let rndID = Math.floor(Math.random() * pinMultiplier * 0.9 + pinMultiplier * 0.1);
            while (existingIDs.indexOf(rndID) > -1) {
                rndID = Math.floor(Math.random() * pinMultiplier * 0.9 + pinMultiplier * 0.1);
            }
            const newRoom = new Room({
                groupName: req.body.groupName,
                id: shortid.generate(),
                pin: rndID,
                entryPassword: req.body.entryPassword,
                unixTimestamp: new Date().getTime()
            });
            newRoom.save((err, room) => {
                if (err) return console.error(err);
                return res.json(room);
            });
        });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});
