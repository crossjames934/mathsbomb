// Host form submission
hostSetupForm.submit(e => {
    e.preventDefault();
    pleaseWait.show();
    const groupName = groupNameIn.val();
    const entryPassword = entryPasswordIn.val();
    const sendData = {
        groupName: groupName,
        entryPassword: entryPassword
    };
    $.post('/hostSetup', sendData, data => {
        hostPanel.hide();
        pleaseWait.hide();
        hostWaitingPanel.show();
        user = new User(data.groupName, null, data.id, data.pin);
        groupNameDisplay.text(data.groupName);
        pinDisplay.text(data.pin);
        passwordDisplay.text(data.entryPassword);
    });
});

// Player form submission for joining room / game
playerSetupForm.submit(e => {
    e.preventDefault();
    pleaseWait.show();
    const teamName = teamNameEntry.val();
    const playerPin = playerPinEntry.val();
    const playerPassword = playerPasswordEntry.val();
    const sendData = {
        teamName: teamName,
        pin: playerPin,
        entryPassword: playerPassword
    };
    $.post('/joinGame', sendData, data => {
        pleaseWait.hide();
        if (/Access Granted/.test(data)) {
            const dataArr = data.split(":");
            const userID = dataArr[1];
            const groupName = dataArr[2];
            user = new User(groupName, teamName, userID, playerPin);
            playerPanel.hide();
            playerWaitingPanel.show();
            welcomeMsg.text("Welcome " + teamName);
            socket.emit('player added', playerPin);
        } else {
            playerFeedback.text(data);
        }
    });
});