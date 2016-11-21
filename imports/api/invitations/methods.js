import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Projects } from '/imports/api/projects/projects';
import { Invitations } from './invitations';
import { create as createNotification } from '../notifications/methods';

export const create = new ValidatedMethod({
  name: 'invitation.create',
  validate: new SimpleSchema({
    projectId: { type: String },
    userId: { type: String }
  }).validator(),
  run({ projectId, userId }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const project = Projects.findOne({ _id: projectId, active: true });

    if (!project || project.ownerId !== this.userId) {
      throw new Meteor.Error('problem-with-project');
    }

    const user = Meteor.users.findOne({ _id: userId });

    if (!user || !user.profile) {
      throw new Meteor.Error('problem-with-user');
    }

    const invitations = Invitations.find({ 'user.id': userId, 'project.id': projectId }).count();

    if (invitations) {
      throw new Meteor.Error('already-have-invitations-for-this-user');
    }

    return Invitations.insert({
      project: {
        id: projectId,
        name: project.name,
        color: project.color,
        ownerId: project.ownerId
      },
      user: {
        id: userId,
        fullname: user.profile.fullname
      },
      replied: false
    });
  }
});

export const accept = new ValidatedMethod({
  name: 'invitation.accept',
  validate: new SimpleSchema({
    invitationId: { type: String }
  }).validator(),
  run({ invitationId }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const invitation = Invitations.findOne({ _id: invitationId, 'user.id': this.userId });

    if (!invitation) {
      throw new Meteor.Error('invitation-not-found');
    }

    const project = Projects.findOne({ _id: invitation.project.id, usersIds: this.userId });

    if (project) {
      throw new Meteor.Error('the-user-has-already-been-added-to-the-project');
    }

    Invitations.update({
      _id: invitationId
    }, {
      $set: { replied: true }
    });

    Projects.update({
      _id: invitation.project.id
    }, {
      $push: { usersIds: this.userId }
    });

    // What kind of actions and types??
    createNotification.call({
      description: `${invitation.user.fullname} accept your invitation`,
      type: 'Invitation',
      action: 'Invitation',
      recipientId: invitation.project.ownerId
    });
  }
});

export const refuse = new ValidatedMethod({
  name: 'invitation.refuse',
  validate: new SimpleSchema({
    invitationId: { type: String }
  }).validator(),
  run({ invitationId }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const invitation = Invitations.findOne({ _id: invitationId, 'user.id': this.userId });

    if (!invitation) {
      throw new Meteor.Error('invitation-not-found');
    }

    Invitations.remove({ _id: invitationId });

    Projects.update({
      _id: invitation.project.id
    }, {
      $pull: { usersIds: this.userId }
    });

    // What kind of actions and types??
    createNotification.call({
      description: `${invitation.user.fullname} refused your invitation to ${invitation.project.name}`,
      type: 'Invitation',
      action: 'Invitation',
      recipientId: invitation.project.ownerId
    });
  }
});
