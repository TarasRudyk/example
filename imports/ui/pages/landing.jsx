import React from 'react';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <main className="page-content page-landing">
        <div className="container">
          <div className="page-title">
            <h1>Landing page</h1>
          </div>
          <a href="/signin" className="button green">Sign in</a> &nbsp;
          <a href="/signup" className="button blue">Register</a>
        </div>
      </main>
    );
  }
}
