import { FlowRouter } from 'meteor/kadira:flow-router';

import React from 'react';
import Pagination from 'react-js-pagination';

import ProjectItem from '/imports/ui/pages/projects/item';
import Loading from '/imports/ui/components/side-content/loading';
import PageHeader from '/imports/ui/components/header/pageHeader';

export default class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  onChange(page) {
    FlowRouter.setQueryParams({ page });
  }
  render() {
    const content = {
      header: 'Projects',
      subHeader: 'all your projects'

    };
    return (
      <div className="page-main-content page-projects">
        <PageHeader content={content}>
          <div className="title-right-block">
            <a href="/project/create" className="button green">New project</a>
          </div>
        </PageHeader>
        <div className="list">
          <div className="container">
            {this.props.loaded ? this.props.projects.map((p, i) => (
              <ProjectItem
                key={i}
                project={p}
                projectsColors={this.props.projectsColors}
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
  projectsColors: React.PropTypes.arrayOf(React.PropTypes.object),
  currentPage: React.PropTypes.number
};
