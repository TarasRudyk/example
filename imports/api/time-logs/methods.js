import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { TimeLogs } from './time-logs';

export const create = new ValidatedMethod({
  name: 'timelog.create',
  validate: new SimpleSchema({
    projectId: { type: String },
    userId: { type: String },
    taskId: { type: String },
    startAt: { type: Date },
    endAt: { type: Date }
  }).validator(),
  run({ projectId, userId, taskId, startAt, endAt }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    const logId = TimeLogs.insert({ projectId, userId, taskId, startAt, endAt });

    return logId;
  }
});

export const edit = new ValidatedMethod({
  name: 'timelog.edit',
  validate: new SimpleSchema({
    id: { type: String },
    startAt: { type: Date },
    endAt: { type: Date }
  }).validator(),
  run({ id, startAt, andAt }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    return TimeLogs.update({ _id: id }, { $set: { startAt, andAt } });
  }

});

export const remove = new ValidatedMethod({
  name: 'timelog.remove',
  validate: new SimpleSchema({
    id: { type: String }
  }).validator(),
  run({ id }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    return TimeLogs.remove({ _id: id });
  }
});
