import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '/imports/api/tasks/tasks';
import { Projects } from '/imports/api/projects/projects';

import TasksUI from '/imports/ui/pages/project/tabs/tasks/tasks';

export default createContainer(({ projectId }) => {
  const tasksHandle = Meteor.subscribe('tasks.byProject', projectId);
  const projectHandle = Meteor.subscribe('project', projectId);

  const project = projectHandle.ready() ? Projects.findOne({ _id: projectId }) : null;
  const tasks = tasksHandle.ready() ? Tasks.find({ projectId }).fetch() : [];

  let canTaskBeCreated;

  if (project) {
    canTaskBeCreated = !!project.users.find((elem) => {
      if (elem.id === Meteor.userId()) {
        return true;
      }

      return false;
    });
  }

  return {
    canTaskBeCreated,
    tasks: tasks
  };
}, TasksUI);
