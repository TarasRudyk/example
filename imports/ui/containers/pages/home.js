import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { createNotification } from '/imports/api/notifications/actions';
import Home from '/imports/ui/pages/home';

export default createContainer(() => {
  const userIsLogin = !!Meteor.userId();

  createNotification('Notifications', 'notice', '/', Meteor.userId());

  return {
    userIsLogin
  };
}, Home);
