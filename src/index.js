/* global proccess */
// @flow
import { describeActiveForm } from './utils/utils';

export function doOnOpen() {
  const activeFormDescription = describeActiveForm();
  const requestOptions = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(activeFormDescription),
  };
  const endpointUrl = `${proccess.env.stagingServerUrl}/api/v1/form-description`;
  const response = UrlFetchApp.fetch(endpointUrl, requestOptions);
  if (response.getResponseCode() === 200) {
    FormApp.getUi().alert('Form uploaded successfully!');
  } else {
    FormApp.getUi().alert('Error uploading the form');
  }
}
