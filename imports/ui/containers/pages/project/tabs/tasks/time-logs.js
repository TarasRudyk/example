import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { TimeLogs } from '/imports/api/time-logs/time-logs';
import TaskTimelogs from '/imports/ui/pages/project/tabs/tasks/time-logs';

export default createContainer(({ taskId }) => {
  const timeLogsHandle = Meteor.subscribe('timeLogs.byTaskId', taskId);
  const timeLogs = timeLogsHandle.ready() ? TimeLogs.find({ taskId }).fetch() : [];

  return {
    timeLogs
  };
}, TaskTimelogs);
