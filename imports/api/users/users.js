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
  colors: {
    type: Array,
    optional: true
  },
  'colors.$': {
    type: Object
  },
  'colors.$.used': {
    type: Boolean
  },
  'colors.$.color': {
    type: String
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
