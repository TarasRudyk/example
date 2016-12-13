import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Messages = new Mongo.Collection('messages');

Messages.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Messages.schema = new SimpleSchema({
  targetId: {
    type: String
  },
  targetType: {
    type: String,
    allowedValues: [
      'task'
    ]
  },
  content: {
    type: Object,
    blackbox: true
  },
  mentionUsers: {
    type: [String]
  },
  author: {
    type: Object,
    blackbox: true
  },
  createdAt: {
    type: Date()
  }
});

Messages.attachSchema(Messages.schema);
