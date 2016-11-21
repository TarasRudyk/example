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

export const edit = new ValidatedMethod({
  name: 'task.edit',
  validate: new SimpleSchema({
    taskId: {
      type: String
    },
    name: {
      type: String
    },
    description: {
      type: String,
      optional: true
    },
    startAt: {
      type: Date,
      optional: true
    },
    assignedAt: {
      type: String,
      optional: true
    }
  }).validator(),
  run({ taskId, name, description, startAt, assignedAt }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    const task = Tasks.findOne({ _id: taskId });

    if (this.userId !== task.ownerId) {
      throw new Meteor.Error('You are not owner!');
    }

    Tasks.update({ _id: taskId }, { $set: { name, description, startAt, assignedAt } });

    return `/project/${task.projectId}/task/${task._id}`;
  }
});

export const deleteTask = new ValidatedMethod({
  name: 'task.delete',
  validate: new SimpleSchema({
    taskId: {
      type: String
    }
  }).validator(),
  run({ taskId }) {
    const task = Tasks.findOne({ _id: taskId });

    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    if (this.userId !== task.ownerId) {
      throw new Meteor.Error('You are not task owner!');
    }

    Tasks.remove({ _id: taskId });

    return `/project/${task.projectId}`;
  }
});
