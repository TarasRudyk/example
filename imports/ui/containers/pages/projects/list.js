import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Projects } from '/imports/api/projects/projects';

import ProjectsList from '/imports/ui/pages/projects/list';

export default createContainer(({ page }) => {
  const skip = ((parseInt((page), 10) * 7) - 7);
  const query = { 'users.id': Meteor.userId() };
  const options = { sort: { ownerId: Meteor.userId() }, skip, limit: 7 };

  const projectsHandle = Meteor.subscribe('projects', skip || 0, 7);
  const projects = projectsHandle.ready() ? Projects.find(query, options).fetch() : [];

  const projectsCount = projectsHandle.ready() ? Projects.find().count() : 0;

  return {
    loaded: projectsHandle.ready(),
    projects,
    projectsCount,
    currentPage: parseInt((page), 10) || 1
  };
}, ProjectsList);
