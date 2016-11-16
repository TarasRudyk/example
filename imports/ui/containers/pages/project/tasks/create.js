import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects/projects';

import CreateTask from '/imports/ui/pages/project/project-tabs/tasks/create';

export default createContainer(({ projectId }) => {
  const projectHandle = Meteor.subscribe('project', projectId);
  const project = projectHandle.ready() ? Projects.findOne() : {};
  return {
    project: project
  };
}, CreateTask);
