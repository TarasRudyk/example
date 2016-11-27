import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Dashboard from '/imports/ui/pages/dashboard';
import { Tasks } from '/imports/api/tasks/tasks';
import { Projects } from '/imports/api/projects/projects';

export default createContainer(() => {
  const userIsLogin = !!Meteor.userId();
  const userId = Meteor.userId();
  const userProjectIds = Projects.find({ 'users.id': userId }).map(project => project._id);
  const tasksHandle = Meteor.subscribe('tasks.byUserProjects', userProjectIds);

  const tasks = tasksHandle.ready() ?
    Tasks.find({ projectId: { $in: userProjectIds },
      assignedAt: userId,
      active: true,
      isAccepted: true,
      estimate: { $ne: null },
      startAt: { $lte: new Date() } },
      { sort: [['startAt', 'asc']] }).fetch() : [];

  return {
    userIsLogin,
    tasks
  };
}, Dashboard);
