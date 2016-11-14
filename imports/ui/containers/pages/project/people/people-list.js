import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Projects } from '/imports/api/projects/projects';

import PeopleList from '/imports/ui/pages/project/project-tabs/people/list';

export default createContainer(({ projectId }) => {
  const projectHandle = Meteor.subscribe('project', projectId);
  const project = projectHandle.ready() ? Projects.findOne() : {};

  const peopleHandle = Meteor.subscribe('usersByIds', project.usersIds);
  const people = peopleHandle.ready() ? Meteor.users.find({
    _id: {
      $in: project.usersIds
    }
  }).fetch() : [];

  return {
    project: project,
    people: people
  };
}, PeopleList);
