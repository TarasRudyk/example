import React from 'react';

import HistoryList from './history-list';

export class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleLoadMore = this.handleLoadMore.bind(this);
  }
  handleLoadMore(event) {
    event.preventDefault();
    this.props.onLoadMore(this.props.items.length);
  }
  render() {
    return (
      <div className="tasks-history">
        <div className="separator">
          <div className="container">
            <div className="title">
              <h3>History</h3>
            </div>
          </div>
        </div>
        <HistoryList items={this.props.items} />
        <button onClick={this.handleLoadMore}>Load More</button>
      </div>
    );
  }
}

History.propTypes = {
  items: React.PropTypes.array,
  onLoadMore: React.PropTypes.func
};
