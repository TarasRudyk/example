/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Tasks } from '../tasks';

Meteor.publish('tasks.byProject', function (projectId) {
  check(projectId, String);

  return Tasks.find({ projectId, active: true });
});

Meteor.publish('task.byId', function (taskId) {
  check(taskId, String);

  return Tasks.find({ _id: taskId, active: true });
});

Meteor.publish('tasks.byAssignedUser', function (userId) {
  check(userId, String);

  const tasks = Tasks.find({ assignedTo: userId });
  return tasks;
});

Meteor.publish('tasks.byUserProjects', function (selectedProjId, isAssigned) {
  check(selectedProjId, Array);
  check(isAssigned, Match.OneOf(undefined, null, Boolean));

  let query = { projectId: { $in: selectedProjId } };
  if (isAssigned) {
    query = {
      projectId: { $in: selectedProjId },
      assignedTo: this.userId
    };
  }
  return Tasks.find(query);
});
