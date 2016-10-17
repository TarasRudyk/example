import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Projects = new Mongo.Collection('projects');

Projects.schema = new SimpleSchema({
  _id: {
    type: String
  },
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
    type: Array
  },
  taskIds: {
    type: Array
  }
});

Projects.attachSchema(Projects.schema);

Projects.publicFields = {
  name: 1,
  description: 1,
  creationDate: 1,
  active: 1
};

Projects.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

export default Projects;
