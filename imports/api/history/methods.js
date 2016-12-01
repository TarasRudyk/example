import { Meteor } from 'meteor/meteor';
import { Match } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Tasks } from '/imports/api/tasks/tasks';
import { History } from './history';

import { getTaskText } from './utils';

export const log = new ValidatedMethod({
  name: 'history.log',
  validate: (new SimpleSchema({
    type: { type: String },
    currentState: { type: Object, blackbox: true },
    prevState: { type: Object, blackbox: true, optional: true },
    changedFields: { type: [String], optional: true },
    action: { type: String },
    view: { type: String }
  }).validator()),
  run({ type, currentState, prevState, changedFields, action, view }) {
    const user = Meteor.user();

    return History.insert({
      type,
      date: new Date(),
      action,
      currentState,
      prevState,
      changedFields,
      view,
      editor: {
        id: user._id,
        fullname: user.profile.fullname,
        username: user.username
      }
    });
  }
});

export const logTasksChanges = (newData, action, oldData, changedFields) => {
  const taskId = newData._id;
  const view = getTaskText(newData, action, oldData, changedFields, Meteor.user());
  delete newData._id;

  if (!Match.test(newData, Tasks.schema)) {
    throw new Meteor.Error('Target is not an Task object.');
  }

  const currentState = {
    id: taskId,
    projectId: newData.projectId,
    name: newData.name,
    description: newData.description,
    active: newData.active,
    startAt: newData.startAt,
    assignedAt: newData.assignedAt,
    estimate: newData.estimate,
    isAccepted: newData.isAccepted
  };

  let prevState;
  if (oldData) {
    prevState = {
      id: taskId,
      projectId: oldData.projectId,
      name: oldData.name,
      description: oldData.description,
      active: oldData.active,
      startAt: oldData.startAt,
      assignedAt: oldData.assignedAt,
      estimate: oldData.estimate,
      isAccepted: oldData.isAccepted
    };
  } else {
    prevState = null;
  }

  log.call({
    type: 'task',
    prevState,
    currentState,
    changedFields,
    action,
    view
  });
};

// const logProjectChanges = (project, action) => {
//   // TODO: project changes log
//   console.log(action);
//   console.log(project);
// };
