import React from 'react';

export default class HistoryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="history-list-item">
        <div dangerouslySetInnerHTML={({ __html: this.props.item.message })} />
        <div>{this.props.item.createdAt.toString()}</div>
      </div>
    );
  }
}

HistoryListItem.propTypes = {
  item: React.PropTypes.object
};
