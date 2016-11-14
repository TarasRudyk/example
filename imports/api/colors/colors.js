import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Colors = new Mongo.Collection('colors');

Colors.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Colors.schema = new SimpleSchema({
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

Colors.attachSchema(Colors.schema);
