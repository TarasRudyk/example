import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '/imports/api/tasks/tasks';

import TasksUI from '/imports/ui/pages/project/project-tabs/tasks/tasks';

export default createContainer(({ projectId }) => {
  const tasksHandle = Meteor.subscribe('tasks.byProject', projectId);
  const tasks = tasksHandle.ready() ? Tasks.find().fetch() : [];

  return {
    tasks: tasks
  };
}, TasksUI);
