// Click functions added to elements
hostGameBtn.click(hostGame);
hostBackBtn.click(backHome);
playerBackBtn.click(backHome);
joinGameBtn.click(joinGame);
beginBtn.click(beginGame);

function hostGame() {
    introPanel.hide();
    hostPanel.show();
}

function backHome() {
    hostPanel.hide();
    playerPanel.hide();
    introPanel.show();
}

function joinGame() {
    introPanel.hide();
    playerPanel.show();
}

function beginGame() {

}