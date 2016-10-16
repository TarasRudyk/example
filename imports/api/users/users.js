import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Meteor.users.schema = new SimpleSchema({
  _id: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  profile: {
    type: Object,
    optional: true,
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
  emails: {
    type: Array,
    optional: true,
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
  }
});

Meteor.users.attachSchema(Meteor.users.schema);

Meteor.users.publicFields = {
  createdAt: 1,
  services: 1,
  profile: 1,
  emails: 1
};
