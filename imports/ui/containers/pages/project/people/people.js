import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Invitations } from '/imports/api/invitations/invitations';

import People from '/imports/ui/pages/project/project-tabs/people/people';

export default createContainer(({ projectId }) => {
  const invitationsHandle = Meteor.subscribe('invitationsByProject', projectId);
  const invitations = invitationsHandle.ready() ? Invitations.find(
    { 'project.id': projectId, replied: false },
    { skip: 0, limit: 25 }
  ).fetch() : [];

  return {
    invitations: invitations
  };
}, People);
