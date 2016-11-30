import React from 'react';
import { getHistoryItemText } from '/imports/api/history/actions';

export default class HistoryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const text = getHistoryItemText(this.props.item);
    return (
      <div className="history-list-item">
        <div>{text}</div>
        <div>{this.props.item.date.toString()}</div>
      </div>
    );
  }
}

HistoryListItem.propTypes = {
  item: React.PropTypes.object
};
