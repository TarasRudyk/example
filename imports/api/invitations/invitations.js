import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Invitations = new Mongo.Collection('invitations');

Invitations.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Invitations.schema = new SimpleSchema({
  project: {
    type: Object
  },
  'project.id': {
    type: String
  },
  'project.name': {
    type: String
  },
  'project.ownerId': {
    type: String
  },
  user: {
    type: Object
  },
  'user.id': {
    type: String
  },
  'user.fullname': {
    type: String
  },
  'user.avatar': {
    type: String
  },
  replied: {
    type: String,
    allowedValues: ['pending', 'accept', 'refuse']
  },
  repliedAt: {
    type: Date,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue() {
      return new Date();
    }
  }
});

Invitations.attachSchema(Invitations.schema);
