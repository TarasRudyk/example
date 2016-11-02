import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Projects } from '/imports/api/projects/projects';
import ProjectsList from '/imports/ui/pages/projects/list';
import { getLocalState } from '/imports/startup/client/local-state';

export default createContainer(() => {
  const params = getLocalState().get('params') || 0;
  getLocalState().set('params', params);
  const projectsHandle = Meteor.subscribe('projects', params);
  const projects = projectsHandle.ready() ? Projects.find().fetch() : [];
  return {
    projects
  };
}, ProjectsList);
