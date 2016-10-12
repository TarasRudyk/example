import React from 'react';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="page-landing">
        <a href="/signin">Sign in</a>
        <a href="/signup">Register</a>
      </div>
    );
  }
}
