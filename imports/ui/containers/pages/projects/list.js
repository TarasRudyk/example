import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '/imports/api/projects/projects';
import ProjectsList from '/imports/ui/pages/projects/list';

export default createContainer((data) => {
  const skip = ((parseInt((data.page), 10) * 7) - 7);
  const projectsHandle = Meteor.subscribe('projects');
  const projects = projectsHandle.ready() ? Projects.find({}, { skip, limit: 7 }).fetch() : [];
  const projectsCount = projectsHandle.ready() ? Projects.find().count() : 0;
  return {
    projects, projectsCount, loaded: projectsHandle.ready(), page: parseInt((data.page), 10)
  };
}, ProjectsList);
