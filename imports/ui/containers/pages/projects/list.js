import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects/projects';
import ProjectsList from '/imports/ui/pages/projects/list';
import { getLocalState } from '/imports/startup/client/local-state';

export default createContainer(() => {
  const skip = getLocalState().get('skip') || 0;
  const projectsHandle = Meteor.subscribe('projects');
  const projects = projectsHandle.ready() ? Projects.find({}, { skip, limit: 7 }).fetch() : [];
  const projectsCount = projectsHandle.ready() ? Projects.find().count() : 0;
  return {
    projects, projectsCount
  };
}, ProjectsList);
