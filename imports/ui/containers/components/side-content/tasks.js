import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '/imports/api/tasks/tasks';
import { Projects } from '/imports/api/projects/projects';

import TasksList from '/imports/ui/components/side-content/tasks';

export default createContainer(() => {
  const userId = Meteor.userId();
  const userProjectIds = Projects.find({ 'users.id': userId }).map(project => project._id);
  const userProjects = Projects.find({ 'users.id': userId }).map((project) => {
    const projects = {
      name: project.name,
      id: project._id
    };
    return projects;
  });
  const tasksHandle = Meteor.subscribe('tasks.byUserProjects', userProjectIds);

  const assignedAtTasks = tasksHandle.ready() ?
    Tasks.find({
      projectId: { $in: userProjectIds },
      assignedAt: userId,
      isAccepted: { $in: [null, false] }
    },
      { sort: [['estimate', 'asc'], ['creationDate', 'desc']] }).fetch() : [];

  const notAssignedAtTasks = tasksHandle.ready() ?
    Tasks.find({
      projectId: { $in: userProjectIds },
      assignedAt: { $ne: userId },
      isAccepted: { $in: [null, false] }
    }, { sort: [['creationDate', 'desc'], ['assignedAt', 'asc']] }).fetch() : [];

  const tasks = assignedAtTasks.concat(notAssignedAtTasks);

  return {
    tasks,
    userProjects
  };
}, TasksList);
