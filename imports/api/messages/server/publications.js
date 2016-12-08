/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Messages } from '../messages';

Meteor.publish('taskMessages', function (taskId) {
  check(taskId, String);
  return Messages.find({ targetType: 'task', targetId: taskId });
});
