import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { History } from '/imports/api/history/history';

import { History as HistoryComponent } from '/imports/ui/components/history/history';

export default createContainer(({ projectId }) => {
  const handleProjectTasksHistory = Meteor.subscribe('projectTasksHistory', projectId);

  const items = handleProjectTasksHistory.ready() ?
    History.find({ type: 'task', 'currentState.projectId': projectId }).fetch() : [];

  return {
    items: items
  };
}, HistoryComponent);
