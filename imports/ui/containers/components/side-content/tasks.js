import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { getLocalState } from '/imports/startup/client/local-state';

import { Tasks } from '/imports/api/tasks/tasks';
import { Projects } from '/imports/api/projects/projects';

import TasksList from '/imports/ui/components/side-content/tasks';

export default createContainer(() => {
  const userId = Meteor.userId();
  const userProjects = Projects.find({ 'users.id': userId }).map((project) => {
    const projects = {
      name: project.name,
      id: project._id
    };
    return projects;
  });
  const userProjectIds = Projects.find({ 'users.id': userId }).map(project => project._id);
  const selectedProjId = !getLocalState().get('userProjectIds') ? userProjectIds : [getLocalState().get('userProjectIds')];
  const isAssigned = getLocalState().get('isAssigned');

  const tasksHandle = Meteor.subscribe('tasks.byUserProjects', selectedProjId, isAssigned);

  const assignedAtTasks = tasksHandle.ready() ?
    Tasks.find({
      projectId: { $in: selectedProjId },
      assignedAt: userId,
      isAccepted: { $in: [null, false] }
    },
      { sort: [['estimate', 'asc'], ['creationDate', 'desc']] }).fetch() : [];

  const notAssignedAtTasks = tasksHandle.ready() ?
    Tasks.find({
      projectId: { $in: selectedProjId },
      assignedAt: { $ne: userId },
      isAccepted: { $in: [null, false] }
    }, { sort: [['creationDate', 'desc'], ['assignedAt', 'asc']] }).fetch() : [];

  const tasks = isAssigned ? assignedAtTasks : assignedAtTasks.concat(notAssignedAtTasks);

  return {
    tasks,
    userProjects
  };
}, TasksList);
