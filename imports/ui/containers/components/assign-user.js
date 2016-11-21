import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { createContainer } from 'meteor/react-meteor-data';

import AssignUser from '/imports/ui/components/assign-user/main';

export default createContainer(({ project }) => {
  check(project, Object);

  const usersHandle = Meteor.subscribe('usersInProjectByName', project);

  const users = usersHandle.ready() ?
    Meteor.users.find({
      $or: [{ _id: Meteor.userId() },
      { _id: { $in: project.usersIds } }]
    }).fetch() : [];

  return {
    users: users
  };
}, AssignUser);
