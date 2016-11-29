import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notifications } from '/imports/api/notifications/notifications';
import { Invitations } from '/imports/api/invitations/invitations';
import { Tasks } from '/imports/api/tasks/tasks';
import { Projects } from '/imports/api/projects/projects';

import MainLayout from '/imports/ui/layouts/main';

export default createContainer(() => {
  const userIsLogin = !!Meteor.userId();
  const user = Meteor.user();

  const notificationsHandle = Meteor.subscribe('notifications');
  const notificationsCount = notificationsHandle.ready() ?
    Notifications.find({ read: false }).count() : 0;

  const invitationsHandle = Meteor.subscribe('invitations');
  const invitationsCount = invitationsHandle.ready() ?
    Invitations.find({ 'user.id': Meteor.userId(), replied: false }).count() : 0;

  const count = notificationsCount + invitationsCount;

  const userId = Meteor.userId();

  const projectsHandle = Meteor.subscribe('projects');

  const userProjectIds = projectsHandle ? Projects.find({ 'users.id': userId }).map(
    project => project._id
  ) : [];
  const tasksHandle = Meteor.subscribe('tasks.byUserProjects', userProjectIds);

  const assignedTasks = tasksHandle.ready() ?
    Tasks.find({ projectId: { $in: userProjectIds }, assignedAt: userId }).count() : 0;

  return {
    userIsLogin,
    user,
    notificationsCount: count,
    assignedTasksCount: assignedTasks
  };
}, MainLayout);
