import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Projects } from '/imports/api/projects/projects';
import { Invitations } from '/imports/api/invitations/invitations';

import PeopleList from '/imports/ui/pages/project/tabs/people/list';

export default createContainer(({ projectId }) => {
  const projectHandle = Meteor.subscribe('project', projectId);
  const project = projectHandle.ready() ? Projects.findOne() : {};

  const peopleHandle = Meteor.subscribe('usersByIds', project.usersIds || []);
  const people = peopleHandle.ready() ? Meteor.users.find({
    _id: {
      $in: project.usersIds
    }
  }).fetch() : [];

  const invitationsHandle = Meteor.subscribe('invitationsByProject', projectId);
  const invitations = invitationsHandle.ready() ? Invitations.find(
    { 'project.id': projectId, replied: false },
    { skip: 0, limit: 25 }
  ).fetch() : [];

  return {
    project,
    people,
    invitations
  };
}, PeopleList);
