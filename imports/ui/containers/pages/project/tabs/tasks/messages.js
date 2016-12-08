import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '/imports/api/messages/messages';

import { Messages as MessagesComponent } from '/imports/ui/components/messages/messages';

export default createContainer(({ target }) => {
  const handleTaskMessages = Meteor.subscribe('taskMessages', target._id);

  const messages = handleTaskMessages.ready() ?
    Messages.find({ targetType: 'task', targetId: target._id }).fetch() : [];

  const enableToWrite = target.workedOnThat ? target.workedOnThat.includes(Meteor.userId()) : false;

  return {
    messages,
    enableToWrite
  };
}, MessagesComponent);
