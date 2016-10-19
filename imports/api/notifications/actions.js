import { Session } from 'meteor/session';
import { check } from 'meteor/check';

export const addNotification = (text) => {
  check(text, String);

  const id = new Date().getTime();
  const notifications = Session.get('notifications') || [];

  notifications.push({ text, id });

  Session.set('notifications', notifications);
};
