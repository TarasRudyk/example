import React from 'react';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="page page-dashboard">
        <div className="container">
          <div className="page-title">
            <h1>Dashboard</h1>
          </div>
          <a href="/logout">Log out</a>
        </div>
      </div>
    );
  }
}
