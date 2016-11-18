import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Tasks } from './tasks';

export const create = new ValidatedMethod({
  name: 'task.create',
  validate: new SimpleSchema({
    name: { type: String },
    description: { type: String },
    assignedAt: { type: String },
    startAt: { type: Date, optional: true },
    projectId: { type: String }
  }).validator(),
  run({ name, description, assignedAt, startAt, projectId }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    return Tasks.insert({
      name,
      description,
      projectId,
      ownerId: this.userId,
      ownerName: Meteor.user().profile.fullname,
      active: true,
      creationDate: new Date(),
      startAt,
      assignedAt
    });
  }
});
