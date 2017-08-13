/* global app */

// this function is used by an menu item
// eslint-disable-next-line no-unused-vars
function makeFormOffline() {
  app.doOnOpen();
}

function onOpen() {
  FormApp.getUi().createAddonMenu().addItem('Make this form offline', 'makeFormOffline').addToUi();
}

// eslint-disable-next-line no-unused-vars
function onInstall() {
  onOpen();
}
