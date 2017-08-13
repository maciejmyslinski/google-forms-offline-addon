// @flow
import { describeActiveForm } from './utils/utils';

export function doOnOpen() {
  const activeFormDescription = describeActiveForm();
  Logger.log(activeFormDescription);
}
