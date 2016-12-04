/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { History } from '/imports/api/history/history';

Meteor.publish('projectTasksHistory', function (projectId) {
  check(projectId, String);
  return History.find({ type: 'task', 'currentState.projectId': projectId });
});

Meteor.publish('taskHistory', function (taskId, limit) {
  check(taskId, String);
  check(limit, Number);

  return History.find({ type: 'task', 'currentState.id': taskId },
  { sort: { date: -1 }, limit: limit });
});
