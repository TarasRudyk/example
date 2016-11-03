import React from 'react';
import { deleteProject } from '/imports/api/projects/actions.js';

import UserSearch from '/imports/ui/containers/components/user-search/main';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }

  render() {
    const { _id, name, ownerName, description } = this.props.project;

    return (
      <div className="page-main-content page-project">
        <div className="separator">
          <div className="container">
            <div className="title">
              <h1>{name} <span>Owner: {ownerName}</span></h1>
              <div className="title-right-block">
                <a href={`/project/edit/${_id}`} className="button green">Edit</a>
                <button className="button red" value={_id} onClick={this.deleteHandler}>Remove</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Tabs onSelect={this.handleSelect} selectedIndex={2}>
             <TabList>
               <Tab>Foo</Tab>
               <Tab>Bar</Tab>
               <Tab>Baz</Tab>
             </TabList>
             <TabPanel>
              <h2>Hello from Foo</h2>
            </TabPanel>
            <TabPanel>
              <h2>Hello from Bar</h2>
            </TabPanel>
            <TabPanel>
              <h2>Hello from Baz</h2>
            </TabPanel>
          </Tabs>
        </div>
        <div className="container">
          <div className="project-description">
            <div className="title">
              <h2>About</h2>
            </div>
            {description || 'No description of the project'}
          </div>
          <div className="project-users">
            <div className="title">
              <h2>Users</h2>
            </div>

            <UserSearch />
          </div>
        </div>
      </div>
    );
  }
}

SingleProject.propTypes = {
  project: React.PropTypes.object
};
