import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Notifications } from './notifications';

export const create = new ValidatedMethod({
  name: 'notification.create',
  validate: new SimpleSchema({
    description: { type: String },
    type: { type: String },
    recipientId: { type: String }
  }).validator(),
  run({ description, type, recipientId }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Notifications.insert({
      description,
      type,
      recipientId,
      read: false
    });
  }
});

export const allRead = new ValidatedMethod({
  name: 'notification.allRead',
  validate: new SimpleSchema({}).validator(),
  run() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Notifications.update({
      recipientId: this.userId,
      read: false
    }, {
      $set: { read: true }
    }, {
      multi: true
    });
  }
});
