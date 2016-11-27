import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AssignUser from '/imports/ui/components/assign-user/main';

export default createContainer(({ project }) => {
  const usersHandle = Meteor.subscribe('usersInProject', project);

  let users;
  if (project && project.users) {
    const usersIds = project.users.map(u => u.id);
    users = usersHandle.ready() ?
      Meteor.users.find({
        _id: { $in: usersIds }
      }).fetch() : [];
  }

  return {
    users: users || []
  };
}, AssignUser);
