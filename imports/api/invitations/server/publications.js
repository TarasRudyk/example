/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Invitations } from '../invitations';

Meteor.publish('invitations', function () {
  return Invitations.find({ 'user.id': this.userId, replied: 'pending' });
});

Meteor.publish('invitationsByProject', function (projectId) {
  check(projectId, String);

  return Invitations.find(
    { 'project.id': projectId, replied: 'pending' },
    { skip: 0, limit: 25 }
  );
});
