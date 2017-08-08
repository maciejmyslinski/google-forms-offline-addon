// @flow

// eslint-disable-next-line no-unused-vars
function describeActiveForm() {
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
    customClosedFormMessage: activeForm.getCustomClosedFormMessage(),
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
function makeFormOffline() {
  describeActiveForm();
}

// see https://developers.google.com/apps-script/reference/forms/page-break-item
function describePageBreakItem(pageBreakItem) {
  const pageBreakItemDescription: {
    goToPage: number,
    helpText: string,
    id: number,
    index: number,
    pageNavigationType: 'CONTINUE' | 'GO_TO_PAGE' | 'RESTART' | 'SUBMIT',
    title: string,
    type: string,
  } = {
    goToPage: pageBreakItem.getGoToPage().getId(),
    helpText: pageBreakItem.getHelpText(),
    id: pageBreakItem.getId(),
    index: pageBreakItem.getIndex(),
    pageNavigationType: pageBreakItem.getPageNavigationType(),
    title: pageBreakItem.getTitle(),
    type: pageBreakItem.getType(),
  };
  return pageBreakItemDescription;
}

// see https://developers.google.com/apps-script/reference/forms/choice
function describeChoice(choice) {
  const choiceDescription: {
    gotoPage: object,
    pageNavigationType: 'CONTINUE' | 'GO_TO_PAGE' | 'RESTART' | 'SUBMIT',
    value: string,
    isCorrectAnswer: boolean,
  } = {
    gotoPage: describePageBreakItem(choice.getGotoPage()),
    pageNavigationType: choice.getPageNavigationType(),
    value: choice.getValue(),
    isCorrectAnswer: choice.isCorrectAnswer(),
  };
  return choiceDescription;
}

// see https://developers.google.com/apps-script/reference/forms/quiz-feedback
function describeQuizFeedback(quizFeedback) {
  const quizFeedbackDescription: {
    text: string,
    linkUrls: Array<string>,
  } = {
    text: quizFeedback.getText(),
    linkUrls: quizFeedback.getLinkUrls(),
  };
  return quizFeedbackDescription;
}

// see https://developers.google.com/apps-script/reference/forms/checkbox-item
// eslint-disable-next-line no-unused-vars
function describeCheckboxItem(checkboxItem) {
  const checkboxDescription: {
    helpText: string,
    id: number,
    index: number,
    title: string,
    type: string,
    points: integer,
    hasOtherOption: boolean,
    isRequired: boolean,
    choices: array,
    feedbackForCorrect: object,
    feedbackForIncorrect: object,
  } = {
    helpText: checkboxItem.getHelpText(),
    id: checkboxItem.getId(),
    index: checkboxItem.getIndex(),
    title: checkboxItem.getTitle(),
    type: checkboxItem.getType(),
    points: checkboxItem.getPoints(),
    hasOtherOption: checkboxItem.hasOtherOption(),
    isRequired: checkboxItem.isRequired(),
    choices: checkboxItem.getChoices().reduce(choice => describeChoice(choice)),
    feedbackForCorrect: describeQuizFeedback(checkboxItem.getFeedbackForCorrect()),
    feedbackForIncorrect: describeQuizFeedback(checkboxItem.getFeedbackForIncorrect()),
  };
  return checkboxDescription;
}

// see https://developers.google.com/apps-script/reference/forms/date-item
// eslint-disable-next-line no-unused-vars
function describeDateItem(dateItem) {
  const dateItemDescription: {
    generalFeedback: object,
    helpText: string,
    id: number,
    index: number,
    points: number,
    title: string,
    type: string,
    includesYear: boolean,
    isRequired: boolean,
  } = {
    generalFeedback: describeQuizFeedback(dateItem.getGeneralFeedback()),
    helpText: dateItem.getHelpText(),
    id: dateItem.getId(),
    index: dateItem.getIndex(),
    points: dateItem.getPoints(),
    title: dateItem.getTitle(),
    type: dateItem.getType(),
    includesYear: dateItem.includesYear(),
    isRequired: dateItem.isRequired(),
  };
  return dateItemDescription;
}

// see https://developers.google.com/apps-script/reference/forms/date-time-item
// eslint-disable-next-line no-unused-vars
function describeDateTimeItem(dateTimeItem) {
  // dateTimeItem looks exactly the same as dateItem
  return describeDateItem(dateTimeItem);
}

// see https://developers.google.com/apps-script/reference/forms/duration-item
// eslint-disable-next-line no-unused-vars
function describeDurationItem(durationItem) {
  const durationItemDescription: {
    generalFeedback: object,
    helpText: string,
    id: number,
    index: number,
    points: number,
    title: string,
    type: string,
    isRequired: boolean,
  } = {
    generalFeedback: describeQuizFeedback(durationItem.getGeneralFeedback()),
    helpText: durationItem.getHelpText(),
    id: durationItem.getId(),
    index: durationItem.getIndex(),
    points: durationItem.getPoints(),
    title: durationItem.getTitle(),
    type: durationItem.getType(),
    isRequired: durationItem.isRequired(),
  };
  return durationItemDescription;
}

// see https://developers.google.com/apps-script/reference/forms/grid-item
// eslint-disable-next-line no-unused-vars
function describeGridItem(gridItem) {
  const gridItemDescription: {
    columns: Array<string>,
    helpText: string,
    id: number,
    index: number,
    rows: Array<string>,
    title: string,
    type: string,
    isRequired: boolean,
  } = {
    columns: gridItem.getColumns(),
    helpText: gridItem.getHelpText(),
    id: gridItem.getId(),
    index: gridItem.getIndex(),
    rows: gridItem.getRows(),
    title: gridItem.getTitle(),
    type: gridItem.getType(),
    isRequired: gridItem.isRequired(),
  };
  return gridItemDescription;
}

// see https://developers.google.com/apps-script/reference/base/blob
function describeBlob(blob) {
  const blobDescription: {
    bytes: Array,
    contentType: string,
    data: string,
    name: string,
    isGoogleType: boolean,
  } = {
    bytes: blob.getBytes(),
    contentType: blob.getContentType(),
    data: blob.getDataAsString(),
    name: blob.getName(),
    isGoogleType: blob.isGoogleType(),
  };
  return blobDescription;
}

// see https://developers.google.com/apps-script/reference/forms/image-item
// eslint-disable-next-line no-unused-vars
function describeImageItem(imageItem) {
  const imageItemDescription: {
    aligment: string,
    helpText: string,
    id: number,
    image: object,
    index: number,
    title: string,
    type: string,
    width: number,
  } = {
    aligment: imageItem.getAligment(),
    helpText: imageItem.getHelpText(),
    id: imageItem.getId(),
    image: describeBlob(imageItem.getImage()),
    index: imageItem.getIndex(),
    title: imageItem.getTitle(),
    type: imageItem.getType(),
    width: imageItem.getWidth(),
  };
  return imageItemDescription;
}

export function displayMenu() {
  FormApp.getUi().createAddonMenu().addItem('Make this form offline', 'makeFormOffline').addToUi();
}
