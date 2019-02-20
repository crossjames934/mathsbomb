let user;

const socket = io();

socket.on('player added', incoming => {
    console.log(incoming);
});

socket.on('update player list', playerNames => {
    listOfPlayers.map(list => {
        list.text(String(playerNames).replace(",", ", "));
    });
});

socket.on('hello', () => {
    console.log("server says hello");
});
