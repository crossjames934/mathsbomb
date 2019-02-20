const models = require('./models');

module.exports = io => {
    io.on('connection', socket => {
        console.log("a user connected");

        socket.on('hello', () => {
            console.log('hello');
            io.emit('hello');
        });

        socket.on('player added', pin => {
            console.log('player added');
            models.room.find({pin: pin}, (err, docs) => {
                if (err) return console.error(err);
                const playerNames = docs[0].players.map(player => player.teamName);
                io.emit('update player list', playerNames);
            });
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};