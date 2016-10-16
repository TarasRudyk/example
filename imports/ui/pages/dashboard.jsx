import React from 'react';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="page-dashboard">
        <h1>Dashboard</h1>
        <a href="/logout">Log out</a>
      </div>
    );
  }
}
