import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Projects } from '/imports/api/projects/projects';
import ProjectsList from '/imports/ui/pages/projects/list';

export default createContainer(() => {
  const projectsHandle = Meteor.subscribe('projects');
  const projects = projectsHandle.ready() ? Projects.find().fetch() : [];

  return {
    projects
  };
}, ProjectsList);
