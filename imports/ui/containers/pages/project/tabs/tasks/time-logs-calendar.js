import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import TimeLogsCalendar from '/imports/ui/pages/project/tabs/tasks/time-logs-calendar';
import { Tasks } from '/imports/api/tasks/tasks';
import { TimeLogs } from '/imports/api/time-logs/time-logs';
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
        assignedAt: userId,
        active: true,
        isAccepted: true,
        estimate: { $ne: null },
        startAt: { $gte: startOfDay, $lte: endOfDay }
      });

      const dayTimeLogs = dayTasks.map((dayTask) => {
        const dayTimeLog = TimeLogs.find({ taskId: dayTask._id }).fetch();
        estimate += dayTask.estimate;
        return dayTimeLog;
      });

      const tasksCount = dayTasks.count();
      const hh = Math.floor(estimate / 60);
      const mm = estimate % 60;
      return { date: startOfDay, estimate: { mm, hh }, tasksCount, isSelected, dayTimeLogs };
    }) : [];

  return {
    userIsLogin,
    days,
    chosenDay
  };
}, TimeLogsCalendar);
