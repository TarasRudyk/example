/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Invitations } from '../invitations';

Meteor.publish('invitations', function () {
  return Invitations.find({ userId: this.userId, replied: false });
});
