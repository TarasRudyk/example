import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Invitations } from '../invitations/invitations';
import { create as createNotification } from '../notifications/methods';
import { Projects } from './projects';
import { Colors } from '../colors/colors';

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

    const project = Projects.findOne({ name, 'users.id': this.userId, active: true });

    if (project) {
      throw new Meteor.Error('Project with the same name exists');
    }

    const userGradients = Meteor.users.findOne({ _id: this.userId }).getGradientsIds();
    const colors = Colors.find({ _id: { $nin: userGradients } }).fetch();

    if (!colors.length) {
      throw new Meteor.Error('Too much projects was created');
    }

    const random = Math.floor(Math.random() * (colors.length + 1));
    const projectId = Projects.insert({
      name,
      description,
      createdAt: new Date(),
      users: [{
        id: this.userId,
        fullname: Meteor.user().profile.fullname || Meteor.user().username,
        role: 'owner',
        gradient: {
          id: colors[random]._id,
          direction: colors[random].gradient.direction,
          start: colors[random].gradient.start,
          stop: colors[random].gradient.stop
        }
      }]
    });

    return projectId;
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

    const project = Projects.findOne({ name, 'users.id': this.userId, active: true });

    if (project && project._id !== projectId) {
      throw new Meteor.Error('Project with the same name exists');
    }

    return Projects.update({ _id: projectId }, { $set: { name, description } });
  }

});

export const remove = new ValidatedMethod({
  name: 'project.remove',
  validate: new SimpleSchema({
    projectId: { type: String }
  }).validator(),
  run({ projectId }) {
    const owner = Projects.findOne({ _id: projectId }).ownerInfo();

    if (owner.id !== this.userId) {
      throw new Meteor.Error('This is not your project');
    }

    return Projects.update({ _id: projectId }, { $set: { active: false } });
  }
});

export const removeUserFromProject = new ValidatedMethod({
  name: 'project.removeUser',
  validate: new SimpleSchema({
    projectId: { type: String },
    userId: { type: String }
  }).validator(),
  run({ projectId, userId }) {
    const project = Projects.findOne({ _id: projectId });

    const owner = project.users.find(u => u.role === 'owner');

    if (owner.id !== this.userId) {
      throw new Meteor.Error('This is not your project');
    }

    const invitation = Invitations.findOne({ 'user.id': userId, 'project.id': projectId });
    Invitations.remove(invitation);

    createNotification.call({
      description: `${owner.fullname} revoked your access to the ${project.name} project`,
      type: 'Revoke access',
      action: 'Revoke access',
      recipientId: userId
    });

    return Projects.update({ _id: projectId }, { $pull: { users: { id: userId } } });
  }
});
