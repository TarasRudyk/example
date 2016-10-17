import React from 'react';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <main className="page-content page-dashboard">
        <div className="container">
          <div className="page-title">
            <h1>Dashboard</h1>
          </div>
        </div>
      </main>
    );
  }
}
