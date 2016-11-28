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

    const assignHistory = [];

    if (assignedAt) {
      const assignedUser = Meteor.users.findOne({ _id: assignedAt });

      assignHistory.push({
        description: `Task assigned at ${assignedUser.profile.fullname} when create.`,
        assignedAt: assignedAt,
        date: new Date()
      });
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
      assignedAt,
      assignHistory
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

    if ((this.userId === task.ownerId) || (this.userId === task.assignedAt)) {
      let updateQuery;

      if (assignedAt) {
        const assignedUser = Meteor.users.findOne({ _id: assignedAt });

        const assignHistObj = {
          description: `Task reassigned at ${assignedUser.profile.fullname} in edit mode.`,
          assignedAt: assignedAt,
          date: new Date()
        };

        updateQuery = {
          $set: { name, description, startAt, assignedAt },
          $push: { assignHistory: assignHistObj }
        };
      } else {
        updateQuery = { $set: { name, description, startAt } };
      }

      Tasks.update({ _id: taskId }, updateQuery);
    } else {
      throw new Meteor.Error("You can't update this task!");
    }

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

    if ((this.userId === task.ownerId) || (this.userId === task.assignedAt)) {
      Tasks.remove({ _id: taskId });
    } else {
      throw new Meteor.Error("You can't delete this task!");
    }

    return `/project/${task.projectId}`;
  }
});

export const acceptTask = new ValidatedMethod({
  name: 'task.accept',
  validate: new SimpleSchema({
    taskId: {
      type: String
    },
    estimate: {
      type: Number
    }
  }).validator(),
  run({ taskId, estimate }) {
    const task = Tasks.findOne({ _id: taskId });

    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    if ((task.isAccepted !== true && estimate >= 15)) {
      Tasks.update({ _id: taskId },
        { $set: { isAccepted: true, assignedAt: this.userId, estimate, startAt: new Date() } });
    } else {
      throw new Meteor.Error("You can't accept this task!");
    }
    return taskId;
  }
});

export const reassign = new ValidatedMethod({
  name: 'task.reassign',
  validate: new SimpleSchema({
    taskId: {
      type: String
    },
    assignedAt: {
      type: String
    },
    description: {
      type: String
    }
  }).validator(),
  run({ taskId, assignedAt, description }) {
    const task = Tasks.findOne({ _id: taskId });

    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    if ((this.userId === task.ownerId) || (this.userId === task.assignedAt)) {
      const assignHistObj = {
        description: description,
        assignedAt: assignedAt,
        date: new Date()
      };

      Tasks.update({ _id: taskId }, {
        $set: { assignedAt },
        $push: { assignHistory: assignHistObj }
      });
    } else {
      throw new Meteor.Error("You can't reassign user in this task!");
    }

    return `/project/${task.projectId}`;
  }
});
