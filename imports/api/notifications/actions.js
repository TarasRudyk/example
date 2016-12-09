import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { addNotice } from '/imports/api/notices/actions';

export const createNotification = (description, type, action, recipientId) => {
  check(description, String);
  check(type, String);
  check(recipientId, String);

  return Meteor.call('notification.create', { description, type, recipientId }, (err) => {
    if (err) {
      addNotice(err.message);
    }
  });
};

export const allReadNotifications = () => {
  Meteor.call('notification.allRead', {}, (err) => {
    if (err) {
      addNotice(err.message);
    }
  });
};
