import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';

import DashboardCalendar from '/imports/ui/pages/dashboard-calendar';
import { Tasks } from '/imports/api/tasks/tasks';
import { Projects } from '/imports/api/projects/projects';

export default createContainer(({ params }) => {
  const chosenDay = params;
  const userIsLogin = !!Meteor.userId();
  const userId = Meteor.userId();
  const userProjectIds = Projects.find({ 'users.id': userId }).map(project => project._id);
  const tasksHandle = Meteor.subscribe('tasks.byUserProjects', userProjectIds);

  const startOfDay = moment(chosenDay).startOf('day').toDate();
  const endOfDay = moment(chosenDay).endOf('day').toDate();
  const tasks = tasksHandle.ready() ?
    Tasks.find({ projectId: { $in: userProjectIds },
      assignedAt: userId,
      active: true,
      isAccepted: true,
      estimate: { $ne: null },
      startAt: { $lte: startOfDay, $gte: endOfDay }
    }).fetch() : [];
  const days = [
    { day: 'Mo', tasks: 2, estimate: 155 },
    { day: 'Tu', tasks: 1, estimate: 100 },
    { day: 'We', tasks: 3, estimate: 250 },
    { day: 'Th', tasks: 2, estimate: 800 },
    { day: 'Fr', tasks: 4, estimate: 350 },
    { day: 'Sa', tasks: 5, estimate: 450 },
    { day: 'Su', tasks: 3, estimate: 125 }
  ];

  return {
    userIsLogin,
    tasks,
    days
  };
}, DashboardCalendar);
