import React from 'react';
import _ from 'lodash';

import HistoryListGroup from './history-list-group';

export default class HistoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const groups = [];
    const sortedItems = _.sortBy(this.props.items, [i => i.date]).reverse();

    sortedItems.reduce((group, item, index) => {
      if (index === 0) {
        groups.push(group);
        return group;
      }

      const lastGroupItem = group[group.length - 1] || 0;

      if (lastGroupItem.editor.id !== item.editor.id) {
        const newGroup = [item];
        groups.push(newGroup);
        return newGroup;
      }

      group.push(item);
      return group;
    }, [sortedItems[0]]);

    const groupsView = groups.map((item, index) =>
      <HistoryListGroup key={index} items={item} />);

    return (
      <div className="history-list">
        <div className="container">
          {groupsView}
        </div>
      </div>
    );
  }
}

HistoryList.propTypes = {
  items: React.PropTypes.array
};
