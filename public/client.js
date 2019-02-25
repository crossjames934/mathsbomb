let user;

const socket = io();

socket.on('player added', incoming => {
    console.log(incoming);
});

socket.on('update player list', playerNames => {
    listOfPlayers.map(list => {
        list.text(String(playerNames).replace(/,/g, ", "));
    });
});

socket.on('game start', pin => {
    if (pin === user.pin) {
        playerWaitingPanel.hide();
        hostWaitingPanel.hide();
        gamePanel.show();
    }
});

socket.on('count', infoPackage => {
    if (infoPackage.pin === user.pin) {
        countDown.text(infoPackage.secondsLeft);
    }
});

socket.on('session end', pin => {
    if (pin === user.pin) {
        console.log("session ended");
    }
});