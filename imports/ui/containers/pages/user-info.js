import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import UserInfo from '/imports/ui/pages/user-info';

export default createContainer(() => {
  return {
    userData: Meteor.user()
  };
}, UserInfo);
