import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const History = new Mongo.Collection('history');

History.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const Editor = new SimpleSchema({
  id: {
    type: String
  },
  fullname: {
    type: String
  },
  username: {
    type: String
  }
});

History.schema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['task', 'project']
  },
  date: {
    type: Date
  },
  action: {
    type: String
  },
  currentState: {
    type: Object,
    blackbox: true,
    optional: true,
    defaultValue: null
  },
  prevState: {
    type: Object,
    blackbox: true,
    optional: true,
    defaultValue: null
  },
  changedField: {
    type: String,
    optional: true,
    defaultValue: null
  },
  view: {
    type: String
  },
  editor: {
    type: Editor
  },
  additional: {
    type: Object,
    blackbox: true,
    optional: true,
    defaultValue: null
  }
});

History.attachSchema(History.schema);
