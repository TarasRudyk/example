import React from 'react';

import ProjectItem from '/imports/ui/pages/projects/item';

export default class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <main className="page-content page-projects">
        <div className="page-separator">
          <div className="container">
            <div className="page-title">
              <h1>Projects <span>all your projects</span></h1>
              <div className="page-title-right-block">
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
      </main>
    );
  }
}

Projects.propTypes = {
  projects: React.PropTypes.arrayOf(React.PropTypes.object)
};
