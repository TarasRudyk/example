import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Projects } from '/imports/api/projects/projects';
import { Invitations } from './invitations';
import { create as createNotification } from '../notifications/methods';
import { Colors } from '../colors/colors';

export const create = new ValidatedMethod({
  name: 'invitation.create',
  validate: new SimpleSchema({
    projectId: { type: String },
    userId: { type: String }
  }).validator(),
  run({ projectId, userId }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    const project = Projects.findOne({ _id: projectId, active: true });
    const ownerId = project.ownerInfo().id;

    if (!project || ownerId !== this.userId) {
      throw new Meteor.Error('You are not an owner of project');
    }

    const user = Meteor.users.findOne({ _id: userId });

    if (!user || !user.profile) {
      throw new Meteor.Error('Problem with user');
    }

    const invitations = Invitations.find({ 'user.id': userId, 'project.id': projectId }).count();

    if (invitations) {
      throw new Meteor.Error('Already have invitation for this user');
    }

    return Invitations.insert({
      project: {
        id: projectId,
        name: project.name,
        ownerId: ownerId
      },
      user: {
        id: userId,
        fullname: user.profile.fullname,
        avatar: user.profile.avatar || '/images/avatar.png'
      },
      replied: 'pending'
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
      throw new Meteor.Error('User not authorized');
    }

    const invitation = Invitations.findOne({ _id: invitationId, 'user.id': this.userId });

    if (!invitation) {
      throw new Meteor.Error('Invitation not found');
    }

    const project = Projects.findOne({
      _id: invitation.project.id,
      users: { $elemMatch: { id: this.userId } }
    });

    if (project) {
      throw new Meteor.Error('The user has already been added to the project');
    }

    const userGradients = Meteor.users.findOne({ _id: this.userId }).getGradientsIds();
    const colors = Colors.find({ _id: { $nin: userGradients } }).fetch();

    if (!colors.length) {
      throw new Meteor.Error('Too much projects was created');
    }

    const random = Math.floor(Math.random() * (colors.length + 1));

    Invitations.update({
      _id: invitationId
    }, {
      $set: { replied: true }
    });

    Projects.update({
      _id: invitation.project.id
    }, {
      $push: {
        users: {
          id: this.userId,
          fullname: Meteor.user().profile.fullname || Meteor.user().username,
          role: 'user',
          gradient: {
            id: colors[random]._id,
            direction: colors[random].gradient.direction,
            start: colors[random].gradient.start,
            stop: colors[random].gradient.stop
          }
        }
      }
    });

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
      throw new Meteor.Error('User not authorized');
    }

    const invitation = Invitations.findOne({ _id: invitationId, 'user.id': this.userId });

    if (!invitation) {
      throw new Meteor.Error('Invitation not found');
    }

    Invitations.remove({ _id: invitationId });

    Projects.update({
      _id: invitation.project.id
    }, {
      $pull: { users: { id: this.userId } }
    });

    createNotification.call({
      description: `${invitation.user.fullname} refused your invitation to ${invitation.project.name}`,
      type: 'Invitation',
      action: 'Invitation',
      recipientId: invitation.project.ownerId
    });
  }
});
