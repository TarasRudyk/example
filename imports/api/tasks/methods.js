import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Tasks } from './tasks';

export const create = new ValidatedMethod({
  name: 'task.create',
  validate: new SimpleSchema({
    name: { type: String },
    description: { type: String },
    assignedTo: { type: String },
    startAt: { type: Date, optional: true },
    projectId: { type: String }
  }).validator(),
  run({ name, description, assignedTo, startAt, projectId }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    return Tasks.insert({
      name,
      description,
      projectId,
      author: {
        id: this.userId,
        fullname: Meteor.user().profile.fullname
      },
      isRemoved: false,
      createdAt: new Date(),
      startAt,
      assignedTo
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
    assignedTo: {
      type: String,
      optional: true
    }
  }).validator(),
  run({ taskId, name, description, startAt, assignedTo }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    const task = Tasks.findOne({ _id: taskId });

    if ((this.userId === task.author.id) || (this.userId === task.assignedTo)) {
      Tasks.update({ _id: taskId }, { $set: { name, description, startAt, assignedTo } });
    } else {
      throw new Meteor.Error("You can't update this task!");
    }

    return `/task/${task._id}`;
  }
});

export const removeTask = new ValidatedMethod({
  name: 'task.remove',
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

    if ((this.userId === task.author.id) || (this.userId === task.assignedTo)) {
      Tasks.remove({ _id: taskId });
    } else {
      throw new Meteor.Error("You can't remove this task!");
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
    },
    startAt: {
      type: Date,
      optional: true
    }
  }).validator(),
  run({ taskId, estimate, startAt }) {
    const task = Tasks.findOne({ _id: taskId });

    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    if ((task.isAccepted !== true && estimate >= 15)) {
      Tasks.update({ _id: taskId }, {
        $set: {
          isAccepted: true, assignedTo: this.userId, estimate, startAt: startAt || new Date()
        }
      });
    } else {
      throw new Meteor.Error("You can't accept this task!");
    }
    return 'Task is accepted now';
  }
});

export const reassign = new ValidatedMethod({
  name: 'task.reassign',
  validate: new SimpleSchema({
    taskId: {
      type: String
    },
    assignedTo: {
      type: String
    },
    description: {
      type: String
    }
  }).validator(),
  run({ taskId, assignedTo, description }) {
    const task = Tasks.findOne({ _id: taskId });

    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    if ((this.userId === task.author.id) || (this.userId === task.assignedTo)) {
      Tasks.update({ _id: taskId }, {
        $set: { assignedTo, lastReassignReason: description }
      });
    } else {
      throw new Meteor.Error("You can't reassign user in this task!");
    }

    const assignedUser = Meteor.users.findOne({ _id: assignedTo });

    return `Task reassigned at ${assignedUser.profile.fullname}`;
  }
});
