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
  const colorIndex = _.findIndex(userColors, { used: false, color: projectColor });
  const userProjects = Meteor.user().projects;

  if (colorIndex > -1) {
    userColors[colorIndex] = { used: true, color: projectColor };
  }

  userProjects.push(doc._id);

  Meteor.users.update({ _id: userId }, { $set: { colors: userColors, project: userProjects } });
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
  ownerId: {
    type: String
  },
  creationDate: {
    type: Date
  },
  active: {
    type: Boolean
  },
  userIds: {
    type: [String],
    optional: true
  },
  taskIds: {
    type: [String],
    optional: true
  },
  color: {
    type: String
  }
});

Projects.attachSchema(Projects.schema);

Projects.publicFields = {
  name: 1,
  description: 1,
  creationDate: 1,
  active: 1
};
