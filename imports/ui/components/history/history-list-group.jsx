import React from 'react';

import HistoryListItem from './history-list-item';

export default class HistoryListGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };

    this.listToggle = this.listToggle.bind(this);
  }

  listToggle(event) {
    event.preventDefault();
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const groupListView = this.props.items.map((item, index) => {
      const historyListItem = <HistoryListItem key={item._id} item={item} />;

      if (index === 0) return historyListItem;

      if (this.state.isOpen) return historyListItem;

      return null;
    });
    return (
      <div className="history-list-group">
        <div className="lable" />
        <div className="items">
          {groupListView}
        </div>
        { groupListView.length > 1 ?
          <button onClick={this.listToggle} >{this.state.isOpen ? 'Close' : 'Open'}</button> : ''}
      </div>
    );
  }
}

HistoryListGroup.propTypes = {
  items: React.PropTypes.array
};
