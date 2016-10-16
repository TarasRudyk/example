import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Signup from '/imports/ui/pages/signup';

export default createContainer(() => ({
  userInfo: Meteor.user()
}), Signup);
