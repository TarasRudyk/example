import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const changeEmail = new ValidatedMethod({
  name: 'user.changeEmail',
  validate: new SimpleSchema({
    email: { type: String }
  }).validator(),
  run({ email }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
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
  }
});
