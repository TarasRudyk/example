import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { addNotice } from '/imports/api/notices/actions';

export const createNotification = (description, type, action, recipientId) => {
  check(description, String);
  check(type, String);
  check(action, String);
  check(recipientId, String);

  return Meteor.call('notification.create', { description, type, action, recipientId }, (err) => {
    if (err) {
      console.log(err);
      addNotice(err.error);
    }
  });
};
