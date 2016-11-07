import React from 'react';

import ProjectItem from '/imports/ui/pages/projects/item';
import { getLocalState } from '/imports/startup/client/local-state';
import Loading from '/imports/ui/components/side-content/loading.jsx';
import { Pagination } from 'react-bootstrap';

export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activePage: 1 };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    this.setState({ activePage: eventKey });
    if (eventKey > 1) {
      getLocalState().set('skip', (eventKey * 7) - 7);
    } else {
      getLocalState().set('skip', 0);
    }
  }

  render() {
    const perPage = 7;
    const pages = Math.ceil(this.props.projectsCount / perPage);
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
            {this.props.loaded ? this.props.projects.map((p, i) => (
              <ProjectItem
                key={i}
                project={p}
              />
            )) : <Loading /> }
          </div>
        </div>
        <div className="separator border-top ">
          <div className="container text-center">
            <Pagination
              className="projects-pagination pull-center"
              bsSize="large"
              prev
              next
              first
              last
              boundaryLinks
              items={pages}
              maxButtons={10}
              activePage={this.state.activePage}
              onSelect={this.handleSelect}
            />

          </div>
        </div>
      </div>
    );
  }
}

Projects.propTypes = {
  projects: React.PropTypes.arrayOf(React.PropTypes.object),
  projectsCount: React.PropTypes.number,
  loaded: React.PropTypes.bool
};
