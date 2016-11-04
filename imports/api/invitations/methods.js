import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Projects } from '/imports/api/projects/projects';
import { Invitations } from './invitations';

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

    const invitations = Invitations.find({ 'user.id': userId }).count();

    if (invitations) {
      throw new Meteor.Error('already-have-invitations-for-this-user');
    }

    return Invitations.insert({
      project: {
        id: projectId,
        name: project.name,
        color: project.color
      },
      user: {
        id: userId,
        fullname: user.profile.fullname
      }
    });
  }
});
