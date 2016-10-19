import React from 'react';

export default class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <main className="page-content page-projects">
        <div className="container">
          <div className="page-title">
            <h1>Projects</h1>
          </div>
        </div>
      </main>
    );
  }
}
