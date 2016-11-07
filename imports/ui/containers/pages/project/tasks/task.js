import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '/imports/api/tasks/tasks';

import Task from '/imports/ui/pages/project/project-tabs/tasks/task';

export default createContainer(({ taskId }) => {
  const taskHandle = Meteor.subscribe('task.byId', taskId);
  const task = taskHandle.ready() ? Tasks.findOne() : {};

  return {
    task: task
  };
}, Task);
