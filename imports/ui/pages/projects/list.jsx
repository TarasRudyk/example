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
        <div className="container">
          <div className="page-title">
            <h1>Projects</h1>
          </div>
          <a href="/project/create" className="button green">Create new project</a>
          <div className="list">
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
