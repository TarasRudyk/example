import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects/projects';
import ProjectsList from '/imports/ui/pages/projects/list';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default createContainer(() => {
  const skip = ((FlowRouter.getQueryParam('activePage') * 7) - 7);
  const projectsHandle = Meteor.subscribe('projects');
  const projects = projectsHandle.ready() ? Projects.find({}, { skip, limit: 7 }).fetch() : [];
  const projectsCount = projectsHandle.ready() ? Projects.find().count() : 0;
  return {
    projects, projectsCount, loaded: projectsHandle.ready()
  };
}, ProjectsList);
