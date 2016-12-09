import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { create as createNotification } from '/imports/api/notifications/methods';

import { Messages } from './messages';

export const create = new ValidatedMethod({
  name: 'message.create',
  validate: new SimpleSchema({
    targetId: { type: String },
    targetType: { type: String },
    content: { type: Object, blackbox: true },
    mentionUsers: { type: [String] }
  }).validator(),
  run({ targetId, targetType, content, mentionUsers }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    if (mentionUsers.length > 0) {
      mentionUsers.forEach((userId) => {
        createNotification.call({
          description: 'You are mention in the task',
          type: 'message',
          recipientId: userId
        });
      });
    }

    const author = Meteor.users.findOne({ _id: this.userId });

    const { avatar, fullname } = author.profile;

    return Messages.insert({
      targetId,
      targetType,
      content,
      mentionUsers,
      createdAt: new Date(),
      author: {
        id: this.userId,
        avatar,
        link: `/profile/${this.userId}`,
        fullname
      }
    });
  }
});

export const remove = new ValidatedMethod({
  name: 'message.remove',
  validate: new SimpleSchema({
    messageId: { type: String }
  }).validator(),
  run({ messageId }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    return Messages.remove({ _id: messageId });
  }
});
