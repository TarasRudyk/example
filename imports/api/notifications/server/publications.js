/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Notifications } from '../notifications';

Meteor.publish('notifications', function () {
  return Notifications.find({ recipientId: this.userId, read: false });
});