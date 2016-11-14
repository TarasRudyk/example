import React from 'react';

export default class Overview extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="project-description">
        <div className="separator">
          <div className="container">
            <div className="title">
              <h2>Overview</h2>
            </div>
          </div>
        </div>
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
