import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { _ } from 'lodash';
import randomArray from 'unique-random-array';

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
    const unusedColors = _.filter(colors, { used: false });
    const randomColors = randomArray(unusedColors);
    const selectedColor = randomColors();
    const colorIndex = _.findIndex(colors, { used: false, color: selectedColor.color });
    const resultColor = colors[colorIndex].color;

    return Projects.insert({
      name,
      description,
      ownerId: this.userId,
      ownerName: Meteor.user().profile.fullname,
      active: true,
      creationDate: new Date(),
      color: resultColor
    });
  }
});

export const edit = new ValidatedMethod({
  name: 'project.edit',
  validate: new SimpleSchema({
    name: { type: String },
    description: { type: String, optional: true },
    projectId: { type: String }
  }).validator(),
  run({ name, description, projectId }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    const project = Projects.findOne({ name, ownerId: this.userId });
    if (project && project._id !== projectId) {
      throw new Meteor.Error('Project with the same name exists');
    }

    return Projects.update({ _id: projectId }, { $set: { name, description } });
  }

});
