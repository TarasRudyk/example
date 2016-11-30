/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { History } from '/imports/api/history/history';

Meteor.publish('projectTasksHistory', function (projectId) {
  check(projectId, String);
  return History.find({ type: 'task', 'targetState.projectId': projectId });
});
