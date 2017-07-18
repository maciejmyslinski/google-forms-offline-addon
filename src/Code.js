// @flow
/* global FormApp */

function displayMenu() {
  FormApp.getUi()
    .createAddonMenu()
    .addItem("Make this form offline", "makeFormOffline")
    .addToUi();
}

// eslint-disable-next-line no-unused-vars
function makeFormOffline() {
  // todo
}

// eslint-disable-next-line no-unused-vars
function onOpen() {
  displayMenu();
}
