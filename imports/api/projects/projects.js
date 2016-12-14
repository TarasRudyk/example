import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
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
  createdAt: {
    type: Date
  },
  isActive: {
    type: Boolean,
    defaultValue: true
  },
  users: {
    type: [userOfProject]
  },
  tasksIds: {
    type: [String],
    optional: true
  }
});

Projects.helpers({
  ownerInfo() {
    return this.users.find(u => u.role === 'owner') || {};
  },
  userInfo(id) {
    return this.users.find(u => u.id === id) || {};
  },
  usersOfProject() {
    const usersIds = this.users.map(u => u.id);
    return Meteor.users.find({
      _id: { $in: usersIds }
    });
  }
});

Projects.attachSchema(Projects.schema);
