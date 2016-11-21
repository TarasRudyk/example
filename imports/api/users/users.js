import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Meteor.users.schema = new SimpleSchema({
  createdAt: {
    type: Date
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,25}$/
  },
  emails: {
    type: Array,
    optional: true
  },
  'emails.$': {
    type: Object
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  profile: {
    type: Object,
    optional: true
  },
  'profile.fullname': {
    type: String,
    optional: true
  },
  'profile.username': {
    type: String,
    optional: true
  },
  'profile.avatar': {
    type: String,
    optional: true
  },
  projects: {
    type: Array,
    optional: true
  },
  'projects.$': {
    type: Object
  },
  'projects.$.projectId': {
    type: String
  },
  'projects.$.color': {
    type: Object
  },
  'projects.$.color._id': {
    type: String
  },
  'projects.$.color.gradient': {
    type: Object
  },
  'projects.$.color.gradient.start': {
    type: String
  },
  'projects.$.color.gradient.stop': {
    type: String
  },
  'projects.$.color.gradient.direction': {
    type: String
  }
});

Meteor.users.attachSchema(Meteor.users.schema);
