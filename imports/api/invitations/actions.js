import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { addNotice } from '/imports/api/notices/actions';

export const createInvitation = (projectId, userId) => {
  check(projectId, String);
  check(userId, String);

  return Meteor.call('invitation.create', { projectId, userId }, (err) => {
    if (err) {
      addNotice(err.message);
    }
  });
};

export const acceptInvitation = (invitationId) => {
  check(invitationId, String);

  return Meteor.call('invitation.accept', { invitationId }, (err) => {
    if (err) {
      addNotice(err.message);
    }
  });
};

export const refuseInvitation = (invitationId) => {
  check(invitationId, String);

  return Meteor.call('invitation.refuse', { invitationId }, (err) => {
    if (err) {
      addNotice(err.message);
    }
  });
};
