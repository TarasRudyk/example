import { Session } from 'meteor/session';
import { check } from 'meteor/check';

export const addNotice = (text) => {
  check(text, String);

  const id = new Date().getTime();
  const notices = Session.get('notices') || [];

  notices.push({ text, id });

  Session.set('notices', notices);
};
