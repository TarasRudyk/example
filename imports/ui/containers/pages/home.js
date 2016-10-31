import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Home from '/imports/ui/pages/home';

export default createContainer(() => {
  const userIsLogin = !!Meteor.userId();

  return {
    userIsLogin
  };
}, Home);
