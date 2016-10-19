import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Projects } from './projects';

export const create = new ValidatedMethod({
  name: 'projects.create',
  validate: new SimpleSchema({
    name: { type: String },
    description: { type: String, optional: true }
  }).validator(),
  run({ name, description }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    if (Projects.find({ name, ownerId: this.userId }).count()) {
      throw new Meteor.Error('Project with the same name exists');
    }

    return Projects.insert({
      name,
      description,
      ownerId: this.userId,
      active: true,
      creationDate: new Date()
    });
  }
});
