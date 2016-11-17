import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Projects } from '/imports/api/projects/projects';

import ProjectsList from '/imports/ui/pages/projects/list';

export default createContainer(({ page }) => {
  const skip = ((parseInt((page), 10) * 7) - 7);
  const query = { sort: { ownerId: this.userId }, skip, limit: 7 };

  const projectsHandle = Meteor.subscribe('projects');
  const projects = projectsHandle.ready() ? Projects.find({}, query).fetch() : [];
  const projectsCount = projectsHandle.ready() ? Projects.find().count() : 0;

  return {
    loaded: projectsHandle.ready(),
    projects,
    projectsCount,
    currentPage: parseInt((page), 10)
  };
}, ProjectsList);
