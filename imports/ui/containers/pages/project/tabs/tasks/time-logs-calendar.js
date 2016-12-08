import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import TimeLogsCalendar from '/imports/ui/pages/project/tabs/tasks/time-logs-calendar';
import { TimeLogs } from '/imports/api/time-logs/time-logs';
import { Projects } from '/imports/api/projects/projects';

export default createContainer(({ startOfWeek, chosenDay }) => {
  const userIsLogin = !!Meteor.userId();
  const userId = Meteor.userId();
  const userProjectIds = Projects.find({ 'users.id': userId }).map(project => project._id);
  const timeLogsHandle = Meteor.subscribe('timeLogs.byUserProjects', userProjectIds);

  const weekDates = () => {
    const endOfWeek = moment(startOfWeek).add(6, 'days').endOf('day');
    const dates = moment.range(startOfWeek, endOfWeek).toArray('days');
    return dates;
  };

  const days = timeLogsHandle.ready() ?
    weekDates().map((day) => {
      const startOfDay = moment(day).startOf('day').toDate();
      const endOfDay = moment(day).endOf('day').toDate();
      const isSelected = day.format('DD-MM-YYYY') === moment(chosenDay).format('DD-MM-YYYY');
      const dayTimeLogs = TimeLogs.find({ startAt: { $gte: startOfDay, $lte: endOfDay } }).fetch();
      return { isSelected, dayTimeLogs, date: startOfDay };
    }) : [];

  return {
    userIsLogin,
    days,
    chosenDay
  };
}, TimeLogsCalendar);
