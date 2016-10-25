import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { getLocalState } from '/imports/startup/client/local-state';

import UserSearch from '/imports/ui/components/user-search/main';

export default createContainer(() => {
  const username = getLocalState().get('username-search');
  let users = [];

  if (username && username.length > 3) {
    const usersHandle = Meteor.subscribe('usersByUsername', username);
    users = usersHandle.ready() ? Meteor.users.find({ _id: { $ne: Meteor.userId() } }).fetch() : [];
  }

  return {
    users
  };
}, UserSearch);
