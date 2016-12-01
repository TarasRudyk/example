import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { History } from '/imports/api/history/history';

import { History as HistoryComponent } from '/imports/ui/components/history/history';

export default createContainer(({ taskId }) => {
  const handleProjectTasksHistory = Meteor.subscribe('taskHistory', taskId);

  const items = handleProjectTasksHistory.ready() ?
    History.find({ type: 'task', 'currentState.id': taskId }).fetch() : [];

  return {
    items: items
  };
}, HistoryComponent);
