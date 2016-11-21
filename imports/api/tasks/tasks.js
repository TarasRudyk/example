import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
    optional: true
  }
});

Tasks.attachSchema(Tasks.schema);
