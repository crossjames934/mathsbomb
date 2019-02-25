// Hide sections for new visitors
hostPanel.hide();
hostWaitingPanel.hide();
playerPanel.hide();
playerWaitingPanel.hide();
gamePanel.hide();
pleaseWait.hide();

function test() {
    introPanel.hide();
    hostWaitingPanel.show();
    groupNameDisplay.text("TEST NAME");
    pinDisplay.text("413820");
    passwordDisplay.text("someWeakPassword");
}

// test();