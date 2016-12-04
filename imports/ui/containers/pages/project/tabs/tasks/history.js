import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { History } from '/imports/api/history/history';

import { History as HistoryComponent } from '/imports/ui/components/history/history';

export default createContainer(({ taskId, limit }) => {
  const handleProjectTasksHistory = Meteor.subscribe('taskHistory', taskId, limit);

  const items = handleProjectTasksHistory.ready() ?
    History.find({ type: 'task', 'currentState.id': taskId },
      { sort: { date: -1 }, limit: limit }).fetch() : [];

  return {
    items: items
  };
}, HistoryComponent);
