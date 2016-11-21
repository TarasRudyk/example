import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Projects } from '/imports/api/projects/projects';

import ProjectsList from '/imports/ui/pages/projects/list';

export default createContainer(({ page }) => {
  const skip = ((parseInt((page), 10) * 7) - 7);
  const query = { sort: { ownerId: Meteor.userId() }, skip, limit: 7 };

  const projectsHandle = Meteor.subscribe('projects');
  const projects = projectsHandle.ready() ? Projects.find({}, query).fetch() : [];
  const projectsCount = projectsHandle.ready() ? Projects.find().count() : 0;

  const userHandle = Meteor.subscribe('user');
  const user = userHandle.ready() ? Meteor.user() : [];
  const projectsColors = user.projects || [];

  return {
    loaded: projectsHandle.ready() && userHandle.ready(),
    projects,
    projectsCount,
    projectsColors,
    currentPage: parseInt((page), 10) || 1
  };
}, ProjectsList);
