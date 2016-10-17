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
  creationDate: {
    type: Date
  },
  active: {
    type: Boolean
  },
  userIds: {
    type: [String],
    optional: true
  },
  taskIds: {
    type: [String],
    optional: true
  }
});

Projects.attachSchema(Projects.schema);

Projects.publicFields = {
  name: 1,
  description: 1,
  creationDate: 1,
  active: 1
};
