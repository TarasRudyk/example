import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Projects } from '/imports/api/projects/projects';
import { Invitations } from '/imports/api/invitations/invitations';

import PeopleList from '/imports/ui/pages/project/tabs/people/list';

export default createContainer(({ projectId }) => {
  const projectHandle = Meteor.subscribe('project', projectId);
  const project = projectHandle.ready() ? Projects.findOne() : {};
  const usersIds = project.users ? project.users.map(u => u.id) : [];

  const owner = projectHandle.ready() ? Projects.findOne({ _id: project._id }).ownerInfo() : {};

  const peopleHandle = Meteor.subscribe('usersByIds', usersIds);
  const people = peopleHandle.ready() ? Meteor.users.find({
    _id: {
      $in: usersIds
    }
  }).fetch() : [];

  const invitationsHandle = Meteor.subscribe('invitationsByProject', projectId);
  const invitations = invitationsHandle.ready() ? Invitations.find(
    { 'project.id': projectId, replied: false }
  ).fetch() : [];

  return {
    project,
    owner,
    people,
    invitations
  };
}, PeopleList);
