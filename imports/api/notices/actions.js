import { getLocalState } from '/imports/startup/client/local-state';
import { check } from 'meteor/check';

export const addNotice = (text) => {
  check(text, String);

  const id = new Date().getTime();
  const notices = getLocalState().get('notices') || [];

  notices.push({ text, id });

  getLocalState().set('notices', notices);
};
