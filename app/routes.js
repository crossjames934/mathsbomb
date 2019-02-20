const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const bcrypt = require('bcrypt');

const models = require('./models');

// Connect to Database
// mongoose.connect(process.env.DB);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     console.log("Connected to Database! :D");
// });
//
// // Schema and Models
// const roomSchema = new mongoose.Schema({
//     groupName: String,
//     id: String,
//     pin: String,
//     entryPassword: String,
//     unixTimestamp: Number,
//     players: Array
// });
// const Room = mongoose.model('Room', roomSchema);
//
// const playerSchema = new mongoose.Schema({
//     teamName: String,
//     id: String,
//     points: Number,
//     totalPoints: Number,
//     hp: Number
// });
// const Player = mongoose.model('Player', playerSchema);

// EXPORTS - Routes
module.exports = app => {
    // Routes
    app.route('/hostSetup/')
        .post((req, res) => {
            // Get all existing IDs of rooms to make sure we don't generate a duplicate one
            models.room.find((err, docs) => {
                if (err) return console.error(err);
                const existingPINs = docs.map(doc => doc.pin);
                const pinMultiplier = 1000000;
                // Keep generating new number until we get one that doesn't already exist
                let rndID = String(Math.floor(Math.random() * pinMultiplier * 0.9 + pinMultiplier * 0.1));
                while (existingPINs.indexOf(rndID) > -1) {
                    rndID = String(Math.floor(Math.random() * pinMultiplier * 0.9 + pinMultiplier * 0.1));
                }
                const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
                const hash = bcrypt.hashSync(req.body.entryPassword, salt);
                const newRoom = new models.room({
                    groupName: req.body.groupName,
                    id: shortid.generate(),
                    pin: rndID,
                    entryPassword: hash,
                    unixTimestamp: new Date().getTime(),
                    players: []
                });
                newRoom.save((err, room) => {
                    if (err) return console.error(err);
                    return res.json({
                        groupName: req.body.groupName,
                        pin: rndID,
                        entryPassword: req.body.entryPassword
                    });
                });
            });
        });

    app.route('/joinGame/')
        .post((req, res) => {
            models.room.find({pin: req.body.pin}, (err, docs) => {
                // Error connecting
                if (err) {
                    console.error(err);
                    return res.send("Error connecting to server");
                }
                // Room doesn't exist
                if (docs.length === 0) {
                    return res.send("Room doesn't exist - check the PIN");
                }
                // Password doesn't match
                if (!bcrypt.compareSync(req.body.entryPassword, docs[0].entryPassword)) {
                    return res.send("Wrong password");
                }
                // Check if teamName is already taken
                const currentPlayers = docs[0].players;
                const playerNames = currentPlayers.map(player => player.teamName);
                if (playerNames.includes(req.body.teamName)) {
                    return res.send("Team name already exists, choose a new one");
                }
                // All good, all tests passed
                const newID = shortid.generate();
                const newPlayer = new models.player({
                    teamName: req.body.teamName,
                    id: newID,
                    points: 0,
                    totalPoints: 0,
                    hp: 100
                });
                const newPlayerArr = [...currentPlayers, newPlayer];
                models.room.findOneAndUpdate({pin: req.body.pin}, {players: newPlayerArr}, (err) => {
                    if (err) {
                        console.error(err);
                        return res.send("Error connecting to server");
                    }
                    return res.send("Access Granted:"+newID+":"+docs[0].groupName);
                });
            });
        });
};

// module.exports.room = Room;