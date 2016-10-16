import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Signin from '/imports/ui/pages/signin';

export default createContainer(() => ({
  user: Meteor.user()
}), Signin);
