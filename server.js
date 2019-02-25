// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const routes = require('./app/routes');
const socketConnections = require('./app/socketConnections');

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
socketConnections(io);

// Listen for requests
http.listen(process.env.PORT, function(){
    console.log('listening on '+process.env.PORT);
});