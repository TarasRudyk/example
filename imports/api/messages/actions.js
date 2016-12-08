import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { addNotice } from '/imports/api/notices/actions';

export const createMessage = (targetId, targetType, content) => {
  check(targetId, String);
  check(targetType, String);
  check(content, String);

  return Meteor.call('message.create', { targetId, targetType, content }, (err) => {
    if (err) {
      addNotice(err.message);
    }
  });
};
