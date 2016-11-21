import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const userOfProject = new SimpleSchema({
  id: {
    type: String
  },
  fullname: {
    type: String
  },
  role: {
    type: String,
    allowedValues: ['owner', 'administrator', 'user']
  },
  gradient: {
    type: Object
  },
  'gradient.id': {
    type: String
  },
  'gradient.direction': {
    type: String
  },
  'gradient.start': {
    type: String
  },
  'gradient.stop': {
    type: String
  }
});

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
    type: Boolean,
    defaultValue: true
  },
  users: {
    type: [userOfProject]
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
