import React from 'react';

export default class Overview extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="project-overview">
        <div className="container">
          <div className="description">
            {this.props.description || 'No description of the project'}
          </div>
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  description: React.PropTypes.string
};
