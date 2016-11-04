import React from 'react';

import ProjectItem from '/imports/ui/pages/projects/item';
import { getLocalState } from '/imports/startup/client/local-state';

export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  previous() {
    const skip = getLocalState().get('skip') || 0;
    if (skip) {
      getLocalState().set('skip', skip - 7);
    }
  }
  next() {
    const skip = getLocalState().get('skip') || 0;
    if (skip < this.props.projectsCount - 7) {
      getLocalState().set('skip', skip + 7);
    }
  }

  render() {
    return (
      <div className="page-main-content page-projects">
        <div className="separator">
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
        <div className="separator border-top">
          <div className="container">
            <button className="button blue" onClick={this.previous}>Previous</button>
            <button className="button blue" onClick={this.next}>Next</button>
          </div>
        </div>
      </div>
    );
  }
}

Projects.propTypes = {
  projects: React.PropTypes.arrayOf(React.PropTypes.object),
  projectsCount: React.PropTypes.number
};
