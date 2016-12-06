import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const TimeLogs = new Mongo.Collection('timeLogs');

TimeLogs.schema = new SimpleSchema({
  id: {
    type: String,
    label: '_id of the time-log'
  },
  projectId: {
    type: String,
    label: 'projectId'
  },
  userId: {
    type: String,
    label: 'userId'
  },
  taskId: {
    type: String,
    label: 'taskId'
  },
  startAt: {
    type: Date,
    label: 'startAt'
  },
  finishAt: {
    type: Date,
    label: 'finishAt'
  }
});

TimeLogs.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

TimeLogs.attachSchema(TimeLogs.schema);
