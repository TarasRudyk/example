import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects/projects';

import AcceptTask from '/imports/ui/pages/project/tabs/tasks/accept-task';

export default createContainer(({ task }) => {
  if (!task.projectId) return {};

  const projectHandle = Meteor.subscribe('project', task.projectId);
  const project = projectHandle.ready() ? Projects.findOne() : {};

  return {
    project: project
  };
}, AcceptTask);
