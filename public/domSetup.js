// Panels
const introPanel = $("#introPanel");
const hostPanel = $("#hostPanel");
const hostWaitingPanel = $("#hostWaitingPanel");

// Buttons
const joinGameBtn = $("#joinGameBtn");
const hostGameBtn = $("#hostGameBtn");
const hostBackBtn = $("#hostBackBtn");

// Forms and Inputs
const hostSetupForm = $("#hostSetupForm");
const groupNameIn = $("#groupName");
const entryPasswordIn = $("#entryPassword");

// Click functions added to elements
hostGameBtn.click(hostGame);
hostBackBtn.click(backHome);

function hostGame() {
    introPanel.hide();
    hostPanel.show();
}

function backHome() {
    hostPanel.hide();
    introPanel.show();
}

// Host form submission
hostSetupForm.submit(e => {
    e.preventDefault();
    const groupName = groupNameIn.val();
    const entryPassword = entryPasswordIn.val();
    const sendData = {
        groupName: groupName,
        entryPassword: entryPassword
    };
    $.post('/hostSetup', sendData, data => {
        hostPanel.hide();
        hostWaitingPanel.show();
        user = new User(data.groupName, data.id, data.pin, data.entryPassword);
    });
});

// Hide sections for new visitors
hostPanel.hide();
hostWaitingPanel.hide();