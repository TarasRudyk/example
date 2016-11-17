import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '/imports/api/tasks/tasks';

import TasksList from '/imports/ui/components/side-content/tasks-list';

export default createContainer(() => {
  const userId = Meteor.userId();
  const tasksHandle = Meteor.subscribe('tasks.byAssignedUser', userId);
  const tasks = tasksHandle.ready() ?
    Tasks.find({ assignedAt: userId }).fetch() : [];

  return {
    tasks
  };
}, TasksList);
