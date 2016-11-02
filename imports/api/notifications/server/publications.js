/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Notifications } from '../notifications';

Meteor.publish('notifications', function () {
  return Notifications.find({ recipientId: this.userId, read: false });
});

Meteor.publish('notifications-new', function () {
  return Notifications.find({ recipientId: this.userId, read: false });
});

Meteor.publish('notifications-read', function (limit = 0, skip = 0) {
  return Notifications.find({ recipientId: this.userId, read: true },
        { limit, skip });
});
