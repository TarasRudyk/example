import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import TaskItem from '/imports/ui/pages/project/tabs/tasks/item';

export default createContainer(({ task }) => {
  if (!task.assignedTo) return {};

  const userHandle = Meteor.subscribe('userById', task.assignedTo);
  const assignedTo = userHandle.ready() ? Meteor.users.findOne({ _id: task.assignedTo }) : {};

  return {
    assignedTo
  };
}, TaskItem);
