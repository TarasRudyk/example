import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Projects } from '/imports/api/projects/projects';

import SingleProject from '/imports/ui/pages/project/project';

export default createContainer(({ id }) => {
  const projectHandle = Meteor.subscribe('project', id);
  const project = projectHandle.ready() ? Projects.findOne() : {};
  return {
    project
  };
}, SingleProject);
