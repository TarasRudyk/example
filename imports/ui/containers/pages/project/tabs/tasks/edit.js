import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects/projects';
import { Tasks } from '/imports/api/tasks/tasks';

import EditTask from '/imports/ui/pages/project/tabs/tasks/edit';

export default createContainer(({ taskId }) => {
  const taskHandle = Meteor.subscribe('task.byId', taskId);
  const task = taskHandle.ready() ? Tasks.findOne({ _id: taskId }) : null;

  let project;
  if (task) {
    const projectHandle = Meteor.subscribe('project', task.projectId);
    project = projectHandle.ready() ? Projects.findOne({ _id: task.projectId }) : {};
  }

  return {
    project: project || {},
    task
  };
}, EditTask);
