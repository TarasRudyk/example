import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import TaskItem from '/imports/ui/pages/project/tabs/tasks/item';

export default createContainer(({ task }) => {
  const userHandle = Meteor.subscribe('userById', task.assignedAt);
  const assignedAt = userHandle.ready() ? Meteor.users.findOne({ _id: task.assignedAt }) : {};

  return {
    assignedAt
  };
}, TaskItem);
