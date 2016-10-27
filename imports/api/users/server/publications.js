/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { check } from 'meteor/check';

Meteor.publish('user', function () {
  return Meteor.users.find({ _id: this.userId });
});

Meteor.publish('usersByUsername', function (username) {
  check(username, String);

  return Meteor.users.find({ _id: { $ne: this.userId }, username: { $regex: username } });
});
