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
  run({ name, description }) {    // eslint-disable-line
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }
    if (Projects.find({ name, ownerId: this.userId }).count()) {
      throw new Meteor.Error('Project with the same name exists');
    }
    const colors = Colors.find().fetch();
    const randomElem = Math.floor(Math.random() * colors.length);
    const usersProjects = Meteor.users.findOne({ _id: this.userId }).projects;
    const usedColors = usersProjects.map((projects) => projects.colorId);  // eslint-disable-line
    const selectedColor = usedColors.filter((colorId) => colorId === colors[randomElem]._id); // eslint-disable-line

    if (!selectedColor.length) {
      const projectId = Projects.insert({
        name,
        description,
        ownerId: this.userId,
        ownerName: Meteor.user().profile.fullname,
        active: true,
        creationDate: new Date(),
        color: colors[randomElem]
      });
      const usersProject = {
        projectId,
        colorId: colors[randomElem]._id
      };
      Meteor.users.update({ _id: this.userId }, { $push: { projects: usersProject } });
      return projectId;
    }
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

    const project = Projects.findOne({ name, ownerId: this.userId, active: true });
    if (project && project._id !== projectId) {
      throw new Meteor.Error('Project with the same name exists');
    }

    return Projects.update({ _id: projectId }, { $set: { name, description } });
  }

});

export const deactivate = new ValidatedMethod({
  name: 'project.delete',
  validate: new SimpleSchema({
    projectId: { type: String }
  }).validator(),
  run({ projectId }) {
    const project = Projects.findOne({ _id: projectId });
    if (project.ownerId !== this.userId) {
      throw new Meteor.Error('This is not your project');
    }

    return Projects.update({ _id: projectId }, { $set: { active: false } });
  }
});

export const deleteUserFromProject = new ValidatedMethod({
  name: 'project.deleteUser',
  validate: new SimpleSchema({
    projectId: { type: String },
    userId: { type: String }
  }).validator(),
  run({ projectId, userId }) {
    const project = Projects.findOne({ _id: projectId });
    if (project.ownerId !== this.userId) {
      throw new Meteor.Error('This is not your project');
    }

    const invitation = Invitations.findOne({ 'user.id': userId, 'project.id': projectId });
    Invitations.remove(invitation);

    createNotification.call({
      description: `${project.ownerName} revoked your access to the ${project.name} project`,
      type: 'Revoke access',
      action: 'Revoke access',
      recipientId: userId
    });

    return Projects.update({ _id: projectId }, { $pull: { usersIds: userId } });
  }
});
