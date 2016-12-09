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
  recipientId: {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue() {
      return new Date();
    }
  },
  isReaded: {
    type: Boolean
  }
});

Notifications.attachSchema(Notifications.schema);
