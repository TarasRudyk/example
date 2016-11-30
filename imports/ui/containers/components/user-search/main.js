import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { getLocalState } from '/imports/startup/client/local-state';

import UserSearch from '/imports/ui/components/user-search/main';

export default createContainer(() => {
  const username = getLocalState().get('username-search');
  let users = [];

  const allUsersList = getLocalState().get('allUsersList');

  if (username && username.length > 1) {
    const usersHandle = Meteor.subscribe('usersByUsername', username);
    users = usersHandle.ready()
      ? Meteor.users.find({ _id: { $nin: allUsersList }, username: { $regex: username, $options: 'i' } }).fetch()
      : [];
  }

  return {
    users
  };
}, UserSearch);
