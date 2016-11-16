import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { createContainer } from 'meteor/react-meteor-data';

import AssignUserItems from '/imports/ui/components/assign-user/items';

export default createContainer(({ userQuery, project }) => {
  check(userQuery, String);
  check(project, Object);

  const usersHandle = Meteor.subscribe('usersInProjectByName', project);

  const users = usersHandle.ready() ? Meteor.users.find({
    $and: [{ _id: { $ne: Meteor.userId() } }, { _id: { $in: project.usersIds } }],
    $or: [{ username: { $regex: userQuery } }, { 'profile.fullname': { $regex: userQuery, $options: 'i' } }]
  }).fetch() : [];

  return {
    users: users
  };
}, AssignUserItems);
