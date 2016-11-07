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
    type: String
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
  }
});

Tasks.attachSchema(Tasks.schema);
