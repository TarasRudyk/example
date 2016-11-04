/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Invitations } from '../invitations';

Meteor.publish('invitations', function () {
  return Invitations.find({ userId: this.userId, replied: false });
});

Meteor.publish('invitationsByProject', function (projectId) {
  check(projectId, String);

  return Invitations.find(
    { 'project.id': projectId, replied: false },
    { skip: 0, limit: 25 }
  );
});
