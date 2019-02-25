const mongoose = require('mongoose');

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
    unixTimestamp: Number,
    players: Array,
});
const Room = mongoose.model('Room', roomSchema);

const playerSchema = new mongoose.Schema({
    teamName: String,
    id: String,
    points: Number,
    totalPoints: Number,
    hp: Number
});
const Player = mongoose.model('Player', playerSchema);

module.exports.room = Room;

module.exports.player = Player;