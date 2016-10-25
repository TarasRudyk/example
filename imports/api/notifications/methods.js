import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Notifications } from './notifications';

export const create = new ValidatedMethod({
  name: 'notification.create',
  validate: new SimpleSchema({
    description: { type: String },
    type: { type: String },
    action: { type: String },
    recipientId: { type: String }
  }).validator(),
  run({ description, type, action, recipientId }) {
    return Notifications.insert({
      description,
      type,
      action,
      recipientId,
      read: false
    });
  }
});
