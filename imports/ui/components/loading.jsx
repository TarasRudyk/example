import React from 'react';

export default class LoadingComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };
  }
  render() {
    return <div> Loading... </div>;
  }
}
