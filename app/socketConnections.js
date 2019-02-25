const models = require('./models');

module.exports = io => {
    io.on('connection', socket => {
        // Log connection
        console.log("a user connected");

        // Player added to game - appears in box for class to see
        socket.on('player added', pin => {
            console.log('player added');
            models.room.find({pin: pin}, (err, docs) => {
                if (err) return console.error(err);
                const playerNames = docs[0].players.map(player => player.teamName);
                io.emit('update player list', playerNames);
            });
        });

        // Marks the start of the game - start countdown
        socket.on('game start', pin => {
            // Show GamePanel for all players and mark commencement of game
            io.emit('game start', pin);
            // Broadcast Session End message after 60 seconds
            setTimeout(() => {
                io.emit('session end', pin);
            }, 60000);
        });

        // Log disconnect
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};