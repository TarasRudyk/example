import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Profile from '/imports/ui/pages/profile/profile';

export default createContainer(({ id }) => {
  const idNum = id === undefined ? Meteor.userId() : id;

  const userHandle = Meteor.subscribe('userById', idNum);
  const user = userHandle.ready() ? Meteor.users.findOne({ _id: idNum }) : {};

  return {
    user
  };
}, Profile);
