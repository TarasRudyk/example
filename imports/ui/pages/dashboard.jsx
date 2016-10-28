import React from 'react';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="page-main-content page-dashboard">
        <div className="page-separator">
          <div className="container">
            <div className="title">
              <h1>Dashboard <span>all your today tasks</span></h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
