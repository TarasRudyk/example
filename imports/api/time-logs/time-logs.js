import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const TimeLogs = new Mongo.Collection('timeLogs');

TimeLogs.schema = new SimpleSchema({
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
  endAt: {
    type: Date,
    label: 'endAt'
  }
});

TimeLogs.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

TimeLogs.attachSchema(TimeLogs.schema);
