import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { addNotice } from '/imports/api/notices/actions';

export const createMessage = (targetId, targetType, content, mentionUsers) => {
  check(targetId, String);
  check(targetType, String);
  check(content, Object);
  check(mentionUsers, [String]);

  return Meteor.call('message.create', { targetId, targetType, content, mentionUsers }, (err) => {
    if (err) {
      addNotice(err.message);
    }
  });
};
