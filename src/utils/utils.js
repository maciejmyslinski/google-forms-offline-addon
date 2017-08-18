// @flow

function convertEnumToString(enumeration) {
  switch (enumeration) {
    case FormApp.Alignment.LEFT:
      return 'LEFT';
    case FormApp.Alignment.CENTER:
      return 'CENTER';
    case FormApp.Alignment.RIGHT:
      return 'RIGHT';
    case FormApp.DestinationType.SPREADSHEET:
      return 'SPREADSHEET';
    case FormApp.FeedbackType.CORRECT:
      return 'CORRECT';
    case FormApp.FeedbackType.INCORRECT:
      return 'INCORRECT';
    case FormApp.FeedbackType.GENERAL:
      return 'GENERAL';
    case FormApp.ItemType.CHECKBOX:
      return 'CHECKBOX';
    case FormApp.ItemType.CHECKBOX_GRID:
      return 'CHECKBOX_GRID';
    case FormApp.ItemType.DATE:
      return 'DATE';
    case FormApp.ItemType.DATETIME:
      return 'DATETIME';
    case FormApp.ItemType.DURATION:
      return 'DURATION';
    case FormApp.ItemType.GRID:
      return 'GRID';
    case FormApp.ItemType.IMAGE:
      return 'IMAGE';
    case FormApp.ItemType.LIST:
      return 'LIST';
    case FormApp.ItemType.MULTIPLE_CHOICE:
      return 'MULTIPLE_CHOICE';
    case FormApp.ItemType.PAGE_BREAK:
      return 'PAGE_BREAK';
    case FormApp.ItemType.PARAGRAPH_TEXT:
      return 'PARAGRAPH_TEXT';
    case FormApp.ItemType.SCALE:
      return 'SCALE';
    case FormApp.ItemType.SECTION_HEADER:
      return 'SECTION_HEADER';
    case FormApp.ItemType.TEXT:
      return 'TEXT';
    case FormApp.ItemType.TIME:
      return 'TIME';
    case FormApp.PageNavigationType.CONTINUE:
      return 'CONTINUE';
    case FormApp.PageNavigationType.GO_TO_PAGE:
      return 'GO_TO_PAGE';
    case FormApp.PageNavigationType.RESTART:
      return 'RESTART';
    case FormApp.PageNavigationType.SUBMIT:
      return 'SUBMIT';
    default:
      return undefined;
  }
}

// see https://developers.google.com/apps-script/reference/forms/form
function describeForm(form) {
  if (!form) return;
  const formDescription: {
    canEditResponse: boolean,
    collectsEmail: boolean,
    confirmationMessage: string,
    customClosedFormMessage: string,
    description: string,
    editUrl: string,
    editors: Array<string>,
    id: string,
    publishedUrl: string,
    shuffleQuestions: boolean,
    summaryUrl: string,
    title: string,
    hasLimitOneResponsePerUser: boolean,
    hasProgressBar: boolean,
    hasRespondAgainLink: boolean,
    isAcceptingResponses: boolean,
    isPublishingSummary: boolean,
    isQuiz: boolean,
    requiresLogin: boolean,
    shortenFormUrl: string,
  } = {
    canEditResponse: form.canEditResponse(),
    collectsEmail: form.collectsEmail(),
    confirmationMessage: form.getConfirmationMessage(),
    customClosedFormMessage: form.getCustomClosedFormMessage(),
    description: form.getDescription(),
    editUrl: form.getEditUrl(),
    editors: form.getEditors().map(user => (user ? user.getEmail() : undefined)),
    id: form.getId(),
    publishedUrl: form.getPublishedUrl(),
    shuffleQuestions: form.getShuffleQuestions(),
    summaryUrl: form.getSummaryUrl(),
    title: form.getTitle(),
    hasLimitOneResponsePerUser: form.hasLimitOneResponsePerUser(),
    hasProgressBar: form.hasProgressBar(),
    hasRespondAgainLink: form.hasRespondAgainLink(),
    isAcceptingResponses: form.isAcceptingResponses(),
    isPublishingSummary: form.isPublishingSummary(),
    isQuiz: form.isQuiz(),
    requiresLogin: form.requiresLogin(),
    shortenFormUrl: form.getPublishedUrl() && form.shortenFormUrl(form.getPublishedUrl()),
  };
  return formDescription;
}

// see https://developers.google.com/apps-script/reference/forms/page-break-item
function describePageBreakItem(pageBreakItem) {
  if (!pageBreakItem) return;
  const pageBreakItemDescription: {
    goToPage: number,
    helpText: string,
    id: number,
    index: number,
    pageNavigationType: 'CONTINUE' | 'GO_TO_PAGE' | 'RESTART' | 'SUBMIT',
    title: string,
    type: string,
  } = {
    goToPage: pageBreakItem.getGoToPage() && pageBreakItem.getGoToPage().getId(),
    helpText: pageBreakItem.getHelpText(),
    id: pageBreakItem.getId(),
    index: pageBreakItem.getIndex(),
    pageNavigationType: convertEnumToString(pageBreakItem.getPageNavigationType()),
    title: pageBreakItem.getTitle(),
    type: convertEnumToString(pageBreakItem.getType()),
  };
  return pageBreakItemDescription;
}

// see https://developers.google.com/apps-script/reference/forms/choice
function describeChoice(choice) {
  if (!choice) return;
  const choiceDescription: {
    gotoPage: object,
    pageNavigationType: 'CONTINUE' | 'GO_TO_PAGE' | 'RESTART' | 'SUBMIT',
    value: string,
    isCorrectAnswer: boolean,
  } = {
    gotoPage: describePageBreakItem(choice.getGotoPage()),
    pageNavigationType: convertEnumToString(choice.getPageNavigationType()),
    value: choice.getValue(),
    isCorrectAnswer: choice.isCorrectAnswer(),
  };
  return choiceDescription;
}

// see https://developers.google.com/apps-script/reference/forms/quiz-feedback
function describeQuizFeedback(quizFeedback) {
  if (!quizFeedback) return;
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
function describeCheckboxItem(checkboxItem) {
  if (!checkboxItem) return;
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
    type: convertEnumToString(checkboxItem.getType()),
    points: checkboxItem.getPoints(),
    hasOtherOption: checkboxItem.hasOtherOption(),
    isRequired: checkboxItem.isRequired(),
    choices: checkboxItem.getChoices().map(choice => (choice ? describeChoice(choice) : undefined)),
    feedbackForCorrect: describeQuizFeedback(checkboxItem.getFeedbackForCorrect()),
    feedbackForIncorrect: describeQuizFeedback(checkboxItem.getFeedbackForIncorrect()),
  };
  return checkboxDescription;
}

// see https://developers.google.com/apps-script/reference/forms/date-item
function describeDateItem(dateItem) {
  if (!dateItem) return;
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
    type: convertEnumToString(dateItem.getType()),
    includesYear: dateItem.includesYear(),
    isRequired: dateItem.isRequired(),
  };
  return dateItemDescription;
}

// see https://developers.google.com/apps-script/reference/forms/date-time-item
function describeDateTimeItem(dateTimeItem) {
  if (!dateTimeItem) return;
  // dateTimeItem looks exactly the same as dateItem
  return describeDateItem(dateTimeItem);
}

// see https://developers.google.com/apps-script/reference/forms/duration-item
function describeDurationItem(durationItem) {
  if (!durationItem) return;
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
    type: convertEnumToString(durationItem.getType()),
    isRequired: durationItem.isRequired(),
  };
  return durationItemDescription;
}

// see https://developers.google.com/apps-script/reference/forms/grid-item
function describeGridItem(gridItem) {
  if (!gridItem) return;
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
    type: convertEnumToString(gridItem.getType()),
    isRequired: gridItem.isRequired(),
  };
  return gridItemDescription;
}

// see https://developers.google.com/apps-script/reference/base/blob
function describeBlob(blob) {
  if (!blob) return;
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
function describeImageItem(imageItem) {
  if (!imageItem) return;
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
    aligment: convertEnumToString(imageItem.getAlignment()),
    helpText: imageItem.getHelpText(),
    id: imageItem.getId(),
    image: describeBlob(imageItem.getImage()),
    index: imageItem.getIndex(),
    title: imageItem.getTitle(),
    type: convertEnumToString(imageItem.getType()),
    width: imageItem.getWidth(),
  };
  return imageItemDescription;
}

// see https://developers.google.com/apps-script/reference/forms/list-item
function describeListItem(listItem) {
  if (!listItem) return;
  const listItemDescription: {
    choices: Array<object>,
    feedbackForCorrect: object,
    feedbackForIncorrect: object,
    helpText: string,
    id: number,
    index: number,
    points: number,
    title: string,
    type: string,
    isRequired: boolean,
  } = {
    choices: listItem.getChoices().map(choice => (choice ? describeChoice(choice) : undefined)),
    feedbackForCorrect: describeQuizFeedback(listItem.getFeedbackForCorrect()),
    feedbackForIncorrect: describeQuizFeedback(listItem.getFeedbackForIncorrect()),
    helpText: listItem.getHelpText(),
    id: listItem.getId(),
    index: listItem.getIndex(),
    points: listItem.getPoints(),
    title: listItem.getTitle(),
    type: convertEnumToString(listItem.getType()),
    isRequired: listItem.isRequired(),
  };
  return listItemDescription;
}

// see https://developers.google.com/apps-script/reference/forms/multiple-choice-item
function describeMultipleChoiceItem(multipleChoiceItem) {
  if (!multipleChoiceItem) return;
  const multipleChoiceItemDescription: {
    choices: Array<object>,
    feedbackForCorrect: object,
    feedbackForIncorrect: object,
    helpText: string,
    id: number,
    index: number,
    points: number,
    title: string,
    type: string,
    hasOtherOption: boolean,
    isRequired: boolean,
  } = {
    choices: multipleChoiceItem
      .getChoices()
      .map(choice => (choice ? describeChoice(choice) : undefined)),
    feedbackForCorrect: describeQuizFeedback(multipleChoiceItem.getFeedbackForCorrect()),
    feedbackForIncorrect: describeQuizFeedback(multipleChoiceItem.getFeedbackForIncorrect()),
    helpText: multipleChoiceItem.getHelpText(),
    id: multipleChoiceItem.getId(),
    index: multipleChoiceItem.getIndex(),
    points: multipleChoiceItem.getPoints(),
    title: multipleChoiceItem.getTitle(),
    type: convertEnumToString(multipleChoiceItem.getType()),
    hasOtherOption: multipleChoiceItem.hasOtherOption(),
    isRequired: multipleChoiceItem.isRequired(),
  };
  return multipleChoiceItemDescription;
}

// see https://developers.google.com/apps-script/reference/forms/paragraph-text-item
// eslint-disable-next-line no-unused-vars
function describeParagraphTextItem(paragraphTextItem) {
  if (!paragraphTextItem) return;
  const paragraphTextItemDescription: {
    generalFeedback: object,
    helpText: string,
    id: number,
    index: number,
    points: number,
    title: string,
    type: string,
    isRequired: boolean,
  } = {
    generalFeedback: describeQuizFeedback(paragraphTextItem.getGeneralFeedback()),
    helpText: paragraphTextItem.getHelpText(),
    id: paragraphTextItem.getId(),
    index: paragraphTextItem.getIndex(),
    points: paragraphTextItem.getPoints(),
    title: paragraphTextItem.getTitle(),
    type: convertEnumToString(paragraphTextItem.getType()),
    isRequired: paragraphTextItem.isRequired(),
  };
  return paragraphTextItemDescription;
}

// see https://developers.google.com/apps-script/reference/forms/scale-item
function describeScaleItem(scaleItem) {
  if (!scaleItem) return;
  const scaleItemDescription: {
    leftLabel: string,
    lowerBound: number,
    points: number,
    rightLabel: string,
    title: string,
    type: string,
    upperBound: number,
    isRequired: boolean,
  } = {
    generalFeedback: describeQuizFeedback(scaleItem.getGeneralFeedback()),
    helpText: scaleItem.getHelpText(),
    id: scaleItem.getId(),
    index: scaleItem.getIndex(),
    leftLabel: scaleItem.getLeftLabel(),
    lowerBound: scaleItem.getLowerBound(),
    points: scaleItem.getPoints(),
    rightLabel: scaleItem.getRightLabel(),
    title: scaleItem.getTitle(),
    type: convertEnumToString(scaleItem.getType()),
    upperBound: scaleItem.getUpperBound(),
    isRequired: scaleItem.isRequired(),
  };
  return scaleItemDescription;
}

// see https://developers.google.com/apps-script/reference/forms/section-header-item
function describeSectionHeaderItem(sectionHeaderItem) {
  if (!sectionHeaderItem) return;
  const sectionHeaderItemDescription: {
    helpText: string,
    id: number,
    index: number,
    title: string,
    type: string,
  } = {
    helpText: sectionHeaderItem.getHelpText(),
    id: sectionHeaderItem.getId(),
    index: sectionHeaderItem.getIndex(),
    title: sectionHeaderItem.getTitle(),
    type: convertEnumToString(sectionHeaderItem.getType()),
  };
  return sectionHeaderItemDescription;
}

// see https://developers.google.com/apps-script/reference/forms/text-item
function describeTextItem(textItem) {
  if (!textItem) return;
  const textItemDescription: {
    generalFeedback: object,
    helpText: string,
    id: number,
    index: number,
    points: number,
    title: string,
    type: string,
    isRequired: boolean,
  } = {
    generalFeedback: describeQuizFeedback(textItem.getGeneralFeedback()),
    helpText: textItem.getHelpText(),
    id: textItem.getId(),
    index: textItem.getIndex(),
    points: textItem.getPoints(),
    title: textItem.getTitle(),
    type: convertEnumToString(textItem.getType()),
    isRequired: textItem.isRequired(),
  };
  return textItemDescription;
}

// see https://developers.google.com/apps-script/reference/forms/time-item
function describeTimeItem(timeItem) {
  if (!timeItem) return;
  const timeItemDescription: {
    generalFeedback: object,
    helpText: string,
    id: number,
    index: number,
    points: number,
    title: string,
    type: string,
    isRequired: boolean,
  } = {
    generalFeedback: describeQuizFeedback(timeItem.getGeneralFeedback()),
    helpText: timeItem.getHelpText(),
    id: timeItem.getId(),
    index: timeItem.getIndex(),
    points: timeItem.getPoints(),
    title: timeItem.getTitle(),
    type: convertEnumToString(timeItem.getType()),
    isRequired: timeItem.isRequired(),
  };
  return timeItemDescription;
}

// see https://developers.google.com/apps-script/reference/forms/checkbox-grid-item
function describeCheckboxGridItem(checkboxGridItem) {
  if (!checkboxGridItem) return;
  const checkboxGridItemDescription: {
    columns: Array<string>,
    helpText: string,
    id: number,
    index: number,
    rows: Array<string>,
    title: string,
    type: string,
    isRequired: boolean,
  } = {
    columns: checkboxGridItem.getColumns(),
    helpText: checkboxGridItem.getHelpText(),
    id: checkboxGridItem.getId(),
    index: checkboxGridItem.getIndex(),
    rows: checkboxGridItem.getRows(),
    title: checkboxGridItem.getTitle(),
    type: convertEnumToString(checkboxGridItem.getType()),
    isRequired: checkboxGridItem.isRequired(),
  };
  return checkboxGridItemDescription;
}

function describeItem(item) {
  if (!item) return;
  const itemType = item.getType();
  switch (itemType) {
    case FormApp.ItemType.CHECKBOX:
      return describeCheckboxItem(item.asCheckboxItem());
    case FormApp.ItemType.CHECKBOX_GRID:
      return describeCheckboxGridItem(item.asCheckboxGridItem());
    case FormApp.ItemType.DATE:
      return describeDateItem(item.asDateItem());
    case FormApp.ItemType.DATETIME:
      return describeDateTimeItem(item.asDateTimeItem());
    case FormApp.ItemType.DURATION:
      return describeDurationItem(item.asDurationItem());
    case FormApp.ItemType.GRID:
      return describeGridItem(item.asGridItem());
    case FormApp.ItemType.IMAGE:
      return describeImageItem(item.asImageItem());
    case FormApp.ItemType.LIST:
      return describeListItem(item.asListItem());
    case FormApp.ItemType.MULTIPLE_CHOICE:
      return describeMultipleChoiceItem(item.asMultipleChoiceItem());
    case FormApp.ItemType.PAGE_BREAK:
      return describePageBreakItem(item.asPageBreakItem());
    case FormApp.ItemType.PARAGRAPH_TEXT:
      return describeParagraphTextItem(item.asParagraphTextItem());
    case FormApp.ItemType.SCALE:
      return describeScaleItem(item.asScaleItem());
    case FormApp.ItemType.SECTION_HEADER:
      return describeSectionHeaderItem(item.asSectionHeaderItem());
    case FormApp.ItemType.TEXT:
      return describeTextItem(item.asTextItem());
    case FormApp.ItemType.TIME:
      return describeTimeItem(item.asTimeItem());
    default:
      return {
        helpText: item.getHelpText(),
        id: item.getId(),
        index: item.getIndex(),
        title: item.getTitle(),
        type: item.getType(),
      };
  }
}

export function describeActiveForm() {
  const activeForm = FormApp.getActiveForm();
  return {
    ...describeForm(activeForm),
    items: activeForm.getItems().map(item => describeItem(item)),
  };
}
