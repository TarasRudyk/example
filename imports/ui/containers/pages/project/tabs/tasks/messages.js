import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { fromJS } from 'immutable';

import { Messages } from '/imports/api/messages/messages';
import { Projects } from '/imports/api/projects/projects';

import { Messages as MessagesComponent } from '/imports/ui/components/messages/messages';

export default createContainer(({ target }) => {
  const handleTaskMessages = Meteor.subscribe('taskMessages', target._id);
  const messages = handleTaskMessages.ready() ?
    Messages.find({ targetType: 'task', targetId: target._id }).fetch() : [];

  const handleProject = Meteor.subscribe('project', target.projectId);
  const users = handleProject.ready() ?
    Projects.findOne({ _id: target.projectId }).usersOfProject() : [];

  const mentions = fromJS(users.map(user => (
    {
      name: user.profile.fullname,
      link: `/profile/${user._id}`,
      avatar: user.profile.avatar
    }
  )));

  const mentionNotification = `You are mention in message of ${target.name} task`;

  const enableToWrite = target.workedOnThat ? target.workedOnThat.includes(Meteor.userId()) : false;

  return {
    mentionNotification,
    targetType: 'task',
    mentions,
    messages,
    enableToWrite
  };
}, MessagesComponent);
