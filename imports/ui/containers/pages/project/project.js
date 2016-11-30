import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Projects } from '/imports/api/projects/projects';

import SingleProject from '/imports/ui/pages/project/project';

export default createContainer(({ id }) => {
  const projectHandle = Meteor.subscribe('project', id);
  const project = projectHandle.ready() ? Projects.findOne({ _id: id }) : {};
  const owner = projectHandle.ready() ? Projects.findOne({ _id: id }).ownerInfo() : {};

  return {
    loaded: projectHandle.ready(),
    isOwner: owner.id === Meteor.userId(),
    project,
    owner
  };
}, SingleProject);
