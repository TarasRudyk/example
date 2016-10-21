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
    optional: true
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
  'profile.fullName': {
    type: String
  },
  'profile.username': {
    type: String
  },
  'profile.avatar': {
    type: String
  },
  colors: {
    type: [Object]
  },
  projects: {
    type: [Object],
    optional: true
  }
});

Meteor.users.attachSchema(Meteor.users.schema);

Meteor.users.publicFields = {
  createdAt: 1,
  services: 1,
  profile: 1,
  emails: 1,
  colors: 1,
  projects: 1
};
