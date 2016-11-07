import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';

import { Tasks } from '../tasks';

Meteor.publish('tasks.byProject', function () {
  return Tasks.find({ ownerId: this.userId, active: true });
});
