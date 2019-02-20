let user;

const socket = io();

socket.on('player added', incoming => {
    console.log(incoming);
});

socket.on('hello', () => {
    console.log("server says hello");
});

socket.on('boo', () => {
    console.log("AARGH!");
});

socket.emit('hello');