import React from 'react';
import Tasks from '/imports/ui/containers/pages/project/tabs/tasks/tasks';
import People from '/imports/ui/pages/project/tabs/people/people';
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
    const tabIndex = {
      projectId: this.props.project._id,
      index
    };
    localStorage.setItem('tabIndex', JSON.stringify(tabIndex));  // eslint-disable-line
  }
  render() {
    const { project, owner } = this.props;
    const index = JSON.parse(localStorage.getItem('tabIndex')); // eslint-disable-line

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
          selectedIndex={(index && index.projectId === project._id) ? index.index : 0}
        >
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Tasks</Tab>
            <Tab>People</Tab>
          </TabList>
          <TabPanel>
            <Overview description={project.description} />
          </TabPanel>
          <TabPanel>
            <Tasks projectId={project._id} projectOwnerId={owner.id} />
          </TabPanel>
          <TabPanel>
            <People projectId={project._id} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

SingleProject.propTypes = {
  project: React.PropTypes.object,
  owner: React.PropTypes.object,
  isOwner: React.PropTypes.bool
};
