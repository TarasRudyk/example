import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Gradients = new Mongo.Collection('gradients');

Gradients.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Gradients.schema = new SimpleSchema({
  gradient: {
    type: Object
  },
  'gradient.start': {
    type: String
  },
  'gradient.stop': {
    type: String
  },
  'gradient.direction': {
    type: String
  }
});

Gradients.attachSchema(Gradients.schema);
