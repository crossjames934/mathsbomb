// Dependencies
const express = require('express');
const cors = require('cors');
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

// // listen for requests :)
// const listener = app.listen(process.env.PORT, () => {
//     console.log('Your app is listening on port ' + listener.address().port);
// });

http.listen(process.env.PORT, function(){
    console.log('listening on '+process.env.PORT);
});