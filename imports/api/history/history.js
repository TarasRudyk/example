import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const History = new Mongo.Collection('history');

History.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

// const StateOfTask = new SimpleSchema({
//   id: {
//     type: String
//   },
//   name: {
//     type: String
//   },
//   description: {
//     type: String
//   },
//   active: {
//     type: Boolean
//   },
//   startAt: {
//     type: Date
//   },
//   assignedAt: {
//     type: String
//   },
//   estimate: {
//     type: Number
//   },
//   isAccepted: {
//     type: Boolean
//   }
// });

// const StateOfProject = new SimpleSchema({
//   id: {
//     type: String
//   },
//   name: {
//     type: String
//   },
//   description: {
//     type: String
//   },
//   active: {
//     type: Boolean
//   },
//   usersIds: {
//     type: [String]
//   },
//   tasksIds: {
//     type: [String]
//   }
// });

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
    blackbox: true
  },
  prevState: {
    type: Object,
    blackbox: true,
    optional: true,
    defaultValue: null
  },
  changedFields: {
    type: [String],
    optional: true,
    defaultValue: []
  },
  view: {
    type: String
  },
  editor: {
    type: Editor
  }
});

// History.helpers({});

History.attachSchema(History.schema);
