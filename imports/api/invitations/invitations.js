import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Invitations = new Mongo.Collection('invitations');

Invitations.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Invitations.schema = new SimpleSchema({
  projectId: {
    type: String
  },
  userId: {
    type: String
  },
  replied: {
    type: Boolean,
    autoValue() {
      return false;
    }
  },
  creationDate: {
    type: Date,
    autoValue() {
      return new Date();
    }
  }
});

Invitations.attachSchema(Invitations.schema);
