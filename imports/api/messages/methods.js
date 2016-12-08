import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Messagess } from './messages';

export const create = new ValidatedMethod({
  name: 'message.create',
  validate: new SimpleSchema({
    targetId: { type: String },
    targetType: { type: String },
    content: { type: String }
  }).validator(),
  run({ targetId, targetType, content }) {
    if (!this.userId) {
      throw new Meteor.Error('User not authorized');
    }

    return Messagess.insert({
      targetId,
      targetType,
      content,
      createdAt: new Date()
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

    return Messagess.remove({ _id: messageId });
  }
});
