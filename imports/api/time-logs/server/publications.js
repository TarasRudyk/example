/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TimeLogs } from '../time-logs';

Meteor.publish('timeLogs.byTaskId', function (taskId) {
  check(taskId, String);

  return TimeLogs.find({ taskId });
});

