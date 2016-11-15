import React from 'react';
import Tasks from '/imports/ui/containers/pages/project/tasks/tasks';
import People from '/imports/ui/containers/pages/project/people/people';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { deleteProject } from '/imports/api/projects/actions.js';

import Overview from './project-tabs/overview';

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
    return (
      <div className="page-main-content page-project">
        <div className="separator">
          <div className="container">
            <div className="title">
              <h1>{this.props.name} <span>Owner: {this.props.ownerName}</span></h1>
              {this.props.isOwner ?
                <div className="title-right-block">
                  <a href={`/project/edit/${this.props.id}`} className="button green">Edit</a>
                  <button className="button red" value={this.props.id} onClick={this.deleteHandler}>Remove</button>
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
            <Overview description={this.props.description} />
          </TabPanel>
          <TabPanel>
            <Tasks projectId={this.props.id} projectOwnerId={this.props.ownerId} />
          </TabPanel>
          <TabPanel>
            <People projectId={this.props.id} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

SingleProject.propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  ownerName: React.PropTypes.string,
  description: React.PropTypes.string,
  ownerId: React.PropTypes.string,
  isOwner: React.PropTypes.bool
};
