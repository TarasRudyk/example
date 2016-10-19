import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import MainLayout from '/imports/ui/layouts/main';

export default createContainer(() => {
  const userIsLogin = !!Meteor.userId();
  const user = Meteor.user();

  return {
    userIsLogin,
    user
  };
}, MainLayout);
