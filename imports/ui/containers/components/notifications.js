import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import Notifications from '/imports/ui/components/notifications';

export default createContainer(() => {
  const notifications = Session.get('notifications');

  Session.set('notifications', []);

  return {
    notifications
  };
}, Notifications);
