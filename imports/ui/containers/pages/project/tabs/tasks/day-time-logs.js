import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import Timelogs from '/imports/ui/components/timelogs/main';
import { TimeLogs } from '/imports/api/time-logs/time-logs';
import { Projects } from '/imports/api/projects/projects';
import { Tasks } from '/imports/api/tasks/tasks';
import _ from 'lodash';

export default createContainer(({ chosenDay }) => {
  const userId = Meteor.userId();
  const userProjectIds = Projects.find({ 'users.id': userId }).map(project => project._id);
  const tasksHandle = Meteor.subscribe('tasks.byUserProjects', userProjectIds);
  const timeLogsHandle = Meteor.subscribe('timeLogs.byUserProjects', userProjectIds);

  const startOfDay = moment(chosenDay).startOf('day').toDate();
  const endOfDay = moment(chosenDay).endOf('day').toDate();

  const timelogs = timeLogsHandle.ready() && tasksHandle.ready() ?
    TimeLogs.find({ startAt: { $gte: startOfDay, $lte: endOfDay } })
    .map((timeLog) => {
      const taskName = Tasks.findOne({ _id: timeLog.taskId }).name;
      return _.assign(timeLog, { taskName });
    }) : [];

  return {
    timelogs,
    chosenDay
  };
}, Timelogs);
