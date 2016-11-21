import { FlowRouter } from 'meteor/kadira:flow-router';

import React from 'react';
import Pagination from 'react-js-pagination';

import ProjectItem from '/imports/ui/pages/projects/item';
import Loading from '/imports/ui/components/side-content/loading';

export default class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  onChange(page) {
    FlowRouter.setQueryParams({ page });
  }
  render() {
    return (
      <div className="page-main-content page-projects">
        <div className="separator">
          <div className="container">
            <div className="title">
              <h1>Projects <span>all your projects</span></h1>
              <div className="title-right-block">
                <a href="/project/create" className="button green">New project</a>
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
        <div className="container">
          <Pagination
            activePage={this.props.currentPage || 1}
            totalItemsCount={this.props.projectsCount}
            itemsCountPerPage={7}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

Projects.propTypes = {
  loaded: React.PropTypes.bool,
  projects: React.PropTypes.arrayOf(React.PropTypes.object),
  projectsCount: React.PropTypes.number,
  currentPage: React.PropTypes.number
};
