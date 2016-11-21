/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Projects } from '../projects';

Meteor.publish('projects', function () {
  return Projects.find({ 'users.id': this.userId });
});

Meteor.publish('project', function (id) {
  check(id, String);

  return Projects.find({ _id: id });
});
