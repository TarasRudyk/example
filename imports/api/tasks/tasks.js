/* eslint-disable prefer-arrow-callback */
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { logCreate, logEdit, logDelete } from '/imports/api/history/methods';

export const Tasks = new Mongo.Collection('tasks');

Tasks.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Tasks.schema = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  ownerId: {
    type: String
  },
  ownerName: {
    type: String
  },
  active: {
    type: Boolean
  },
  projectId: {
    type: String
  },
  creationDate: {
    type: Date
  },
  startAt: {
    type: Date,
    optional: true
  },
  assignedAt: {
    type: String,
    optional: true,
    label: '_id of assigned user'
  },
  estimate: {
    type: Number,
    optional: true,
    min: 15,
    label: 'Number of minutes of task estimation'
  },
  isAccepted: {
    type: Boolean,
    optional: true,
    label: 'Task is accepted by user'
  }
});

Tasks.after.insert((userId, doc) => {
  logCreate.call({ userId, doc, docType: 'task' });
});

Tasks.after.update(function (userId, doc, fieldNames) {
  const prevDoc = this.previous;
  logEdit.call({ userId, doc, prevDoc, fieldNames, docType: 'task' });
});

Tasks.after.remove((userId, doc) => {
  logDelete.call({ userId, doc, docType: 'task' });
});

Tasks.attachSchema(Tasks.schema);
