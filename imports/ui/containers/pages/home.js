import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Home from '/imports/ui/pages/home';

export default createContainer(() => {
  const user = Meteor.userId() ? true : false;

  return {
    loggingIn: Meteor.loggingIn(),
    user
  };
}, Home);
