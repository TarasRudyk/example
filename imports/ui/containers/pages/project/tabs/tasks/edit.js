import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects/projects';
import { Tasks } from '/imports/api/tasks/tasks';

import EditTask from '/imports/ui/pages/project/tabs/tasks/edit';

export default createContainer(({ projectId, taskId }) => {
  const projectHandle = Meteor.subscribe('project', projectId);
  const project = projectHandle.ready() ? Projects.findOne() : {};

  const taskHandle = Meteor.subscribe('task.byId', taskId);
  const task = taskHandle.ready() ? Tasks.findOne({ _id: taskId }) : null;

  return {
    project: project,
    task: task
  };
}, EditTask);
