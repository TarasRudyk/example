import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import DashboardCalendar from '/imports/ui/pages/dashboard-calendar';
import { Tasks } from '/imports/api/tasks/tasks';
import { Projects } from '/imports/api/projects/projects';

export default createContainer(({ startOfWeek, chosenDay }) => {
  const userIsLogin = !!Meteor.userId();
  const userId = Meteor.userId();
  const userProjectIds = Projects.find({ 'users.id': userId }).map(project => project._id);
  const tasksHandle = Meteor.subscribe('tasks.byUserProjects', userProjectIds);

  const weekDates = () => {
    const endOfWeek = moment(startOfWeek).add(6, 'days').endOf('day');
    const dates = moment.range(startOfWeek, endOfWeek).toArray('days');
    return dates;
  };
  const days = tasksHandle.ready() ?
    weekDates().map((day) => {
      const isSelected = day.format('DD-MM-YYYY') === moment(chosenDay).format('DD-MM-YYYY');
      let estimate = null;
      const startOfDay = moment(day).startOf('day').toDate();
      const endOfDay = moment(day).endOf('day').toDate();
      const dayTasks = Tasks.find({ projectId: { $in: userProjectIds },
        assignedTo: userId,
        active: true,
        isAccepted: true,
        estimate: { $ne: null },
        startAt: { $gte: startOfDay, $lte: endOfDay }
      });
      dayTasks.map((task) => {
        estimate += task.estimate;
        return estimate;
      });
      const tasksCount = dayTasks.count();
      const hh = Math.floor(estimate / 60);
      const mm = estimate % 60;
      return { date: startOfDay, estimate: { mm, hh }, tasksCount, isSelected };
    }) : [];

  return {
    userIsLogin,
    days,
    chosenDay
  };
}, DashboardCalendar);
