import React from 'react';
import Tasks from '/imports/ui/containers/pages/project/tasks/tasks';
import People from '/imports/ui/pages/project/project-tabs/people/people';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { deleteProject } from '/imports/api/projects/actions.js';

import UserSearch from '/imports/ui/containers/components/user-search/main';
import Overview from './project-tabs/overview';

export default class SingleProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

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
    const { _id, name, ownerName, description, ownerId } = this.props.project;

    return (
      <div className="page-main-content page-project">
        <div className="separator">
          <div className="container">
            <div className="title">
              <h1>{name} <span>Owner: {ownerName}</span></h1>
              { this.props.isOwner ?
                <div className="title-right-block">
                  <a href={`/project/edit/${_id}`} className="button green">Edit</a>
                  <button className="button red" value={_id} onClick={this.deleteHandler}>Remove</button>
                </div> : null}
            </div>
          </div>
        </div>
        <Tabs onSelect={this.handleSelect} selectedIndex={0}>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Tasks</Tab>
            <Tab>People</Tab>
          </TabList>
          <TabPanel>
            <Overview />
          </TabPanel>
          <TabPanel>
            <Tasks projectId={_id} projectOwnerId={ownerId} />
          </TabPanel>
          <TabPanel>
            <People project={this.props.project} invitations={this.props.invitations} />
          </TabPanel>
        </Tabs>
        <div className="project-description">
          <div className="separator">
            <div className="container">
              <div className="title">
                <h2>About</h2>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="description">
              {description || 'No description of the project'}
            </div>
          </div>
        </div>
        <div className="project-people">
          <div className="separator border-top">
            <div className="container">
              <div className="title">
                <h2>People</h2>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="list">
              {this.props.invitations.map((inv, i) => (
                <div className="list-item" key={i}>
                  Waiting for a response from <a href={`/profile/${inv.user.id}`}>{inv.user.fullname}</a>
                </div>
              ))}
            </div>
            {this.props.isOwner ?
              <UserSearch projectId={_id} />
            : null}
          </div>
        </div>
      </div>
    );
  }
}

SingleProject.propTypes = {
  project: React.PropTypes.object,
  invitations: React.PropTypes.array,
  isOwner: React.PropTypes.bool
};
