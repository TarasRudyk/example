import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '/imports/api/messages/messages';

import { Messages as MessagesComponent } from '/imports/ui/components/messages/messages';

export default createContainer(({ taskId }) => {
  const handleTaskMessages = Meteor.subscribe('taskMessages', taskId);

  const messages = handleTaskMessages.ready() ?
    Messages.find({ targetType: 'task', targetId: taskId }).fetch() : [];

  return {
    messages
  };
}, MessagesComponent);
