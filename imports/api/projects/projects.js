import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { _ } from 'lodash';

export const Projects = new Mongo.Collection('projects');

Projects.after.insert((userId, doc) => {
  if (!userId) {
    throw new Meteor.Error('User not authorized');
  }

  const userColors = Meteor.user().colors;
  const projectColor = doc.color;
  const index = _.findIndex(userColors, { used: false, color: projectColor });

  if (index > -1) {
    userColors[index] = { used: true, color: projectColor };
  }

  Meteor.users.update({ _id: userId }, { $set: { colors: userColors } });
});

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
