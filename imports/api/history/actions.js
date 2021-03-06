import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { addNotice } from '/imports/api/notices/actions';

export const hisotryLog = (type, target, description) => {
  check(type, String);
  check(target, Object);
  check(description, String);

  return Meteor.call('history.log', { type, target, description }, (err) => {
    if (err) {
      addNotice(err.message);
    }
  });
};
