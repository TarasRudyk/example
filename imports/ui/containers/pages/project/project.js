import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Projects } from '/imports/api/projects/projects';
import { Invitations } from '/imports/api/invitations/invitations';

import SingleProject from '/imports/ui/pages/project/project';

export default createContainer(({ id }) => {
  const projectHandle = Meteor.subscribe('project', id);
  const project = projectHandle.ready() ? Projects.findOne() : {};

  const invitationsHandle = Meteor.subscribe('invitationsByProject', id);
  const invitations = invitationsHandle.ready() ? Invitations.find({
    projectId: id,
    replied: false
  }, {
    skip: 0,
    limit: 25
  }).fetch() : [];

  return {
    project,
    invitations
  };
}, SingleProject);
