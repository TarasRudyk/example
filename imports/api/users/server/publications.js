/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('user', function () {
  return Meteor.users.find({ _id: this.userId },
                           { projects: true });
});

Meteor.publish('usersByUsername', function (username) {
  check(username, String);

  return Meteor.users.find({ _id: { $ne: this.userId }, username: { $regex: username } });
});

Meteor.publish('userById', function (id) {
  check(id, String);

  return Meteor.users.find({ _id: id });
});

Meteor.publish('usersByIds', function (usersIds) {
  check(usersIds, [String]);

  return Meteor.users.find({ _id: { $in: usersIds } });
});
