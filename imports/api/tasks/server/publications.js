import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';

import { Tasks } from '../tasks';
//
// Meteor.publish('tasks', function () {
//   return Tasks.find();
// });
Meteor.publish('projectssa', function () {
  return Tasks.find({ ownerId: this.userId, active: true });
});

// Meteor.publish('tasks.byProject', function () {
//   return Tasks.find();
// });
