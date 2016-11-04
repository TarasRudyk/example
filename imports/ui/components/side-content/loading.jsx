import React from 'react';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };
  }
  render() {
    return <img src="/images/gears.svg" alt="loading..." with="250" />;
  }
}
