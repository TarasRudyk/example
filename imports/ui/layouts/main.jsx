import React from 'react';

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div id="page">
        {this.props.content}
      </div>
    );
  }
}

MainLayout.propTypes = {
  content: React.PropTypes.element
};
