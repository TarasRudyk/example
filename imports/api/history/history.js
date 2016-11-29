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
  targetState: {
    type: Object,
    blackbox: true
  },
  editor: {
    type: Editor
  }
});

// History.helpers({});

History.attachSchema(History.schema);
