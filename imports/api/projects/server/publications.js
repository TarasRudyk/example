import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Projects } from '../projects';

Meteor.publish('projects.my', () => {
  Projects.find({ ownerId: this.userId });
});

Meteor.publish('projects.byId', (projectId) => {
  check(projectId, String);

  Projects.find({ _id: projectId });
});
