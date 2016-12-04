/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Projects } from '../projects';

Meteor.publish('projects', function (skip = 0, limit = 0) {
  check(skip, Number);
  check(limit, Number);

  return Projects.find({ 'users.id': this.userId, active: true }, { skip, limit });
});

Meteor.publish('project', function (id) {
  check(id, String);

  return Projects.find({ _id: id });
});
