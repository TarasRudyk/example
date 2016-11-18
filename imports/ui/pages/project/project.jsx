import React from 'react';
import Tasks from '/imports/ui/containers/pages/project/tabs/tasks/tasks';
import People from '/imports/ui/containers/pages/project/tabs/people/people';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { deleteProject } from '/imports/api/projects/actions.js';

import Overview from './tabs/overview';

export default class SingleProject extends React.Component {
  constructor(props) {
    super(props);

    Tabs.setUseDefaultStyles(false);

    this.deleteHandler = this.deleteHandler.bind(this);
  }
  deleteHandler(e) {
    const id = e.target.value;
    const conf = confirm('Are you sure?'); // eslint-disable-line
    if (conf) {
      deleteProject(id);
    }
  }
  render() {
    const { project } = this.props;

    return (
      <div className="page-main-content page-project">
        <div className="separator">
          <div className="container">
            <div className="title">
              <h1>{project.name} <span>Owner: {project.ownerName}</span></h1>
              {this.props.isOwner ?
                <div className="title-right-block">
                  <a href={`/project/edit/${project._id}`} className="button green">Edit</a>
                  <button className="button red" value={project._id} onClick={this.deleteHandler}>Remove</button>
                </div> : null}
            </div>
          </div>
        </div>
        <Tabs onSelect={this.handleSelect}>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Tasks</Tab>
            <Tab>People</Tab>
          </TabList>
          <TabPanel>
            <Overview description={project.description} />
          </TabPanel>
          <TabPanel>
            <Tasks projectId={project._id} projectOwnerId={project.ownerId} />
          </TabPanel>
          <TabPanel>
            <People projectId={project._id} projectOwnerId={project.ownerId} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

SingleProject.propTypes = {
  project: React.PropTypes.object,
  isOwner: React.PropTypes.bool
};
