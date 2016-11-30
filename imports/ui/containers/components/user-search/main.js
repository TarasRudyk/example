import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { getLocalState } from '/imports/startup/client/local-state';

import UserSearch from '/imports/ui/components/user-search/main';

export default createContainer(() => {
  const username = getLocalState().get('username-search');
  let users = [];
  const invitationsUsersIds = getLocalState().get('usersListIds');
  invitationsUsersIds.push(Meteor.userId());

  if (username && username.length > 1) {
    const usersHandle = Meteor.subscribe('usersByUsername', username);
    users = usersHandle.ready()
      ? Meteor.users.find({ _id: { $nin: invitationsUsersIds }, username: { $regex: username, $options: 'i' } }).fetch()
      : [];
  }

  return {
    users
  };
}, UserSearch);
