import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import _ from 'lodash';

import { Projects } from '/imports/api/projects/projects';

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
  }
});

Meteor.users.helpers({
  getGradientsIds() {
    const userProjects = Projects.find({ 'users.id': this._id }).fetch();
    const userInfo = userProjects.map(p => _.find(p.users, u => u.id === this._id));
    return userInfo.map(g => g.gradient.id) || [];
  }
});

Meteor.users.attachSchema(Meteor.users.schema);
