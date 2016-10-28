import React from 'react';

import ProjectItem from '/imports/ui/pages/projects/item';

export default class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div className="page-main-content page-projects">
        <div className="page-separator">
          <div className="container">
            <div className="title">
              <h1>Projects <span>all your projects</span></h1>
              <div className="title-right-block">
                <a href="/projects/create" className="button green">New project</a>
              </div>
            </div>
          </div>
        </div>
        <div className="list">
          <div className="container">
            {this.props.projects.map((p, i) => (
              <ProjectItem
                key={i}
                project={p}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Projects.propTypes = {
  projects: React.PropTypes.arrayOf(React.PropTypes.object)
};
