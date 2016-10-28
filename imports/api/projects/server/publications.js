/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Projects } from '../projects';

Meteor.publish('projects', function () {
  return Projects.find({ ownerId: this.userId, active: true });
});

Meteor.publish('projects.byIds', function (projectsIds) {
  check(projectsIds, [String]);

  return Projects.find({ _id: { $in: projectsIds } });
});

Meteor.publish('project', function (id) {
  check(id, String);

  return Projects.find({ _id: id, ownerId: this.userId });
});
