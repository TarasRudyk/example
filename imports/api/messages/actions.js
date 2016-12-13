import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { addNotice } from '/imports/api/notices/actions';

export const createMessage = (targetId, targetType, content, notification, mentionUsers) => {
  check(targetId, String);
  check(targetType, String);
  check(content, Object);
  check(notification, String);
  check(mentionUsers, [String]);

  return Meteor.call('message.create', { targetId, targetType, content, notification, mentionUsers }, (err) => {
    if (err) {
      addNotice(err.message);
    }
  });
};
