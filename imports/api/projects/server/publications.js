import { Meteor } from 'meteor/meteor';

import { Projects } from '../projects';

Meteor.publish('projects.public', () => {
  Projects.find({ userId: this.userId });
});
