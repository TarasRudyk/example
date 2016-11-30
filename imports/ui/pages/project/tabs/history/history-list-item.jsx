import React from 'react';

export default class HistoryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { action, targetState, editor, date, type } = this.props.item;

    return (
      <div className="history-list-item">
        <div>{editor.fullname} {action} {type} {targetState.name}</div>
        <div>{date.toString()}</div>
      </div>
    );
  }
}

HistoryListItem.propTypes = {
  item: React.PropTypes.object
};
