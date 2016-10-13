import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Projects.schema = new SimpleSchema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
    optional: true,
  },
  ownerId: {
    type: String
  }
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
    type: Array,
  },
});

Projects.attachSchema(Projects.schema);
