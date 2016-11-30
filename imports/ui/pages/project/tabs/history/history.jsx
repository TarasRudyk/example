import React from 'react';

import HistoryList from './history-list';

export class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      </div>
    );
  }
}

History.propTypes = {
  items: React.PropTypes.array
};
