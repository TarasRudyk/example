/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Tasks } from '../tasks';

Meteor.publish('tasks.byProject', function (projectId) {
  check(projectId, String);

  return Tasks.find({ projectId, active: true });
});

Meteor.publish('task.byId', function (taskId) {
  check(taskId, String);

  return Tasks.find({ _id: taskId, active: true });
});
