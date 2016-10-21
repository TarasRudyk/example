import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { _ } from 'lodash';

import { Projects } from './projects';

export const create = new ValidatedMethod({
  name: 'project.create',
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

    const colors = Meteor.user().colors;
    const unusedColors = _.filter(colors, color => !color.used);
    const randomInt = Math.floor(Math.random() * (unusedColors.length + 1)) + 0;

    return Projects.insert({
      name,
      description,
      ownerId: this.userId,
      active: true,
      creationDate: new Date(),
      color: colors[randomInt].color
    });
  }
});
