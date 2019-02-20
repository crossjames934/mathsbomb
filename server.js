// Dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const routes = require('./routes');

// Server files and basic app usage
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Home page
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

// Routes
routes(app);

// Socket connections
io.on('connection', socket => {
    console.log("a user connected");

    socket.on('hello', () => {
        console.log('hello');
    });

    socket.on('player added', () => {
        console.log('player added');
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


// // listen for requests :)
// const listener = app.listen(process.env.PORT, () => {
//     console.log('Your app is listening on port ' + listener.address().port);
// });

http.listen(process.env.PORT, function(){
    console.log('listening on '+process.env.PORT);
});