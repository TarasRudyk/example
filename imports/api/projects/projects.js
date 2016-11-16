// import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { _ } from 'lodash';
// import { Colors } from '../colors/colors';

export const Projects = new Mongo.Collection('projects');

// Projects.after.insert((userId, _id) => {
//   console.log(`fasfefse ${userId} sgags ${_id}`);
//   if (!userId) {
//     throw new Meteor.Error('User not authorized');
//   }
//
//   const colorsId = Colors.findOne({})._id;
//
//   Meteor.users.update({ _id: userId }, { $addToSet: { colors: colorsId } });
// });

Projects.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Projects.schema = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  color: {
    type: Object
  },
  'color._id': {
    type: String
  },
  'color.gradient': {
    type: Object
  },
  'color.gradient.start': {
    type: String
  },
  'color.gradient.stop': {
    type: String
  },
  'color.gradient.direction': {
    type: String
  },
  ownerId: {
    type: String
  },
  ownerName: {
    type: String
  },
  creationDate: {
    type: Date
  },
  active: {
    type: Boolean
  },
  usersIds: {
    type: [String],
    optional: true
  },
  tasksIds: {
    type: [String],
    optional: true
  }
});

Projects.attachSchema(Projects.schema);
