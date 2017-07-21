// @flow

// eslint-disable-next-line no-unused-vars
export function describeActiveForm() {
  const activeForm = FormApp.getActiveForm();
  const formDescription: {
    canEditResponse: boolean,
    collectsEmail: boolean,
    confirmationMessage: string,
    closedFormMessage: string,
    description: string,
    destinationId: string,
    editUrl: string,
    editors: Array<string>,
    id: string,
    publishedUrl: string,
    shuffleQuestions: boolean,
    summaryUrl: string,
    title: string,
    hasLimitOneResponsePerUser: boolean,
    hasProgressBar: boolean,
    hasResponseAgainLink: boolean,
    isAcceptingResponses: boolean,
    isPublishingSummary: boolean,
    isQuiz: boolean,
    requiresLogin: boolean,
    shortenFormUrl: string,
  } = {
    canEditResponse: activeForm.canEditResponse(),
    collectsEmail: activeForm.collectsEmail(),
    confirmationMessage: activeForm.getConfirmationMessage(),
    closedFormMessage: activeForm.getCustomClosedFormMessage(),
    description: activeForm.getDescription(),
    destinationId: activeForm.getDestinationId(),
    editUrl: activeForm.getEditUrl(),
    editors: activeForm.getEditors().map(user => user.getEmail()),
    id: activeForm.getId(),
    publishedUrl: activeForm.getPublishedUrl(),
    shuffleQuestions: activeForm.getShuffleQuestions(),
    summaryUrl: activeForm.getSummaryUrl(),
    title: activeForm.getTitle(),
    hasLimitOneResponsePerUser: activeForm.hasLimitOneResponsePerUser(),
    hasProgressBar: activeForm.hasProgressBar(),
    hasResponseAgainLink: activeForm.hasResponseAgainLink(),
    isAcceptingResponses: activeForm.isAcceptingResponses(),
    isPublishingSummary: activeForm.isPublishingSummary(),
    isQuiz: activeForm.isQuiz(),
    requiresLogin: activeForm.requiresLogin(),
    shortenFormUrl: activeForm.shortenFormUrl(),
  };
  return formDescription;
}

// eslint-disable-next-line no-unused-vars
export function displayMenu() {
  FormApp.getUi().createAddonMenu().addItem('Make this form offline', 'makeFormOffline').addToUi();
}
