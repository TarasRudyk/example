import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Notifications = new Mongo.Collection('notifications');

Notifications.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Notifications.schema = new SimpleSchema({
  description: {
    type: String
  },
  type: {
    type: String
  },
  action: {
    type: String
  },
  creationDate: {
    type: Date,
    autoValue() {
      return new Date();
    }
  },
  recipientId: {
    type: String
  },
  read: {
    type: Boolean
  }
});

Notifications.attachSchema(Notifications.schema);
