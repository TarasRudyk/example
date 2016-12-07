import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Projects } from '/imports/api/projects/projects';
import { Invitations } from '/imports/api/invitations/invitations';
import { History } from '/imports/api/history/history';
import { Tasks } from '/imports/api/tasks/tasks';

export const changeEmail = new ValidatedMethod({
  name: 'user.changeEmail',
  validate: new SimpleSchema({
    email: { type: String }
  }).validator(),
  run({ email }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }
    if (Accounts.findUserByEmail(email)) {
      throw new Meteor.Error('Email is already taken');
    }
    Meteor.users.update(this.userId, { $set: { 'emails.0.address': email } });
  }
});

export const changeFullname = new ValidatedMethod({
  name: 'user.changeFullname',
  validate: new SimpleSchema({
    fullname: { type: String }
  }).validator(),
  run({ fullname }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }
    Meteor.users.update(this.userId, { $set: { 'profile.fullname': fullname } });
    Invitations.update({ 'user.id': this.userId }, { $set: { 'user.fullname': fullname } }, { multi: true });
    History.update({ 'editor.id': this.userId }, { $set: { 'editor.fullname': fullname } }, { multi: true });
    Projects.update({ 'users.id': this.userId }, { $set: { 'users.$.fullname': fullname } }, { multi: true });
    Tasks.update({ 'author.id': this.userId }, { $set: { 'author.fullname': fullname } }, { multi: true });
  }
});
