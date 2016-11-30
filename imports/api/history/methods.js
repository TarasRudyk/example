import { Meteor } from 'meteor/meteor';
import { Match } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Tasks } from '/imports/api/tasks/tasks';
import { History } from './history';

export const log = new ValidatedMethod({
  name: 'history.log',
  validate: new SimpleSchema({
    type: { type: String },
    targetState: { type: Object, blackbox: true },
    action: { type: String }
  }).validator(),
  run({ type, targetState, action }) {
    const user = Meteor.user();

    return History.insert({
      type,
      date: new Date(),
      action,
      targetState,
      editor: {
        id: user._id,
        fullname: user.profile.fullname,
        username: user.username
      }
    });
  }
});

export const logTasksChanges = (task, action) => {
  const taskId = task._id;
  delete task._id;

  if (!Match.test(task, Tasks.schema)) {
    throw new Meteor.Error('Target is not an Task object.');
  }

  const taskState = {
    id: taskId,
    projectId: task.projectId,
    name: task.name,
    description: task.description,
    active: task.active,
    startAt: task.startAt,
    assignedAt: task.assignedAt,
    estimate: task.estimate,
    isAccepted: task.isAccepted
  };

  log.call({
    type: 'task',
    targetState: taskState,
    action
  });
};

// const logProjectChanges = (project, action) => {
//   // TODO: project changes log
//   console.log(action);
//   console.log(project);
// };
