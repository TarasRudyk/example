import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { getLocalState } from '/imports/startup/client/global';

import UsersSearch from '/imports/ui/components/users-search/main';

export default createContainer(() => {
  const username = getLocalState().get('user-search-string');
  const usersHandle = Meteor.subscribe('usersByUsername', username);
  const users = usersHandle.ready() ? Meteor.users.find({}).fetch() : [];

  return {
    users
  };
}, UsersSearch);
