import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import ProfileEdit from '/imports/ui/pages/profile/profile-edit';

export default createContainer(() => {
  const user = Meteor.user();

  return {
    user
  };
}, ProfileEdit);
