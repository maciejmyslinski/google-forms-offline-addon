// @flow
/* global FormApp */

function displayMenu() {
  FormApp.getUi()
    .createAddonMenu()
    .addItem('Make this form offline', 'makeFormOffline')
    .addToUi();
}

// eslint-disable-next-line no-unused-vars
function makeFormOffline() {
  FormApp.getUi().alert('Hello from Forms Offline Addon!');
}

// eslint-disable-next-line no-unused-vars
function onOpen() {
  displayMenu();
}

// eslint-disable-next-line no-unused-vars
function onInstall() {
  onOpen();
}
