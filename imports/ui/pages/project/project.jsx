import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Tasks from '/imports/ui/containers/pages/project/tabs/tasks/tasks';
import People from '/imports/ui/pages/project/tabs/people/people';
import History from '/imports/ui/containers/pages/project/tabs/history/history';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { deleteProject } from '/imports/api/projects/actions.js';
import PageHeader from '/imports/ui/components/header/pageHeader';
import Overview from './tabs/overview';

export default class SingleProject extends React.Component {
  constructor(props) {
    super(props);

    Tabs.setUseDefaultStyles(false);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  deleteHandler(e) {
    const id = e.target.value;
    const conf = confirm('Are you sure?'); // eslint-disable-line
    if (conf) {
      deleteProject(id);
    }
  }
  handleSelect(index) {
    const tab = index;
    FlowRouter.setQueryParams({ tab });
  }
  render() {
    const { project, owner, index } = this.props;

    return (
      <div className="page-main-content page-project">
        <PageHeader header={project.name} subHeader={owner.fullname} hx={1}>
          {this.props.isOwner ?
            <div>
              <a href={`/project/edit/${project._id}`} className="button green">Edit</a>
              <button className="button red" value={project._id} onClick={this.deleteHandler}>Remove</button>
            </div>
            : null}
        </PageHeader>
        <Tabs
          onSelect={this.handleSelect}
          selectedIndex={index || 0}
        >
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Tasks</Tab>
            <Tab>People</Tab>
            <Tab>History</Tab>
          </TabList>
          <TabPanel>
            <Overview description={project.description} />
          </TabPanel>
          <TabPanel>
            <Tasks projectId={project._id} projectOwnerId={owner.id} />
          </TabPanel>
          <TabPanel>
            <People projectId={project._id} isOwner={this.props.isOwner} />
          </TabPanel>
          <TabPanel>
            <History projectId={project._id} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

SingleProject.propTypes = {
  project: React.PropTypes.object,
  owner: React.PropTypes.object,
  isOwner: React.PropTypes.bool,
  index: React.PropTypes.object
};
