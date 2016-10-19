import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Projects from '/imports/ui/pages/projects/list';

export default createContainer(() => {
  const user = Meteor.user();

  return {
    user
  };
}, Projects);
