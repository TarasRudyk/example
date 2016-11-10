import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import PeopleList from '/imports/ui/pages/project/project-tabs/people/list';

export default createContainer(({ project }) => {
  const peopleHandle = Meteor.subscribe('usersByIds', project.usersIds);
  const people = peopleHandle.ready() ? Meteor.users.find({
    _id: {
      $in: project.usersIds
    }
  }).fetch() : [];

  return {
    people: people
  };
}, PeopleList);
