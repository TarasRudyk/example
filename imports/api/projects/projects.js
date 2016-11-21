import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Projects = new Mongo.Collection('projects');

Projects.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Projects.schema = new SimpleSchema({
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
  creationDate: {
    type: Date
  },
  active: {
    type: Boolean
  },
  usersIds: {
    type: [String],
    optional: true
  },
  tasksIds: {
    type: [String],
    optional: true
  }
});

Projects.attachSchema(Projects.schema);
