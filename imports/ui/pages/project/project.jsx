import React from 'react';
import Tasks from '/imports/ui/containers/pages/project/tabs/tasks/tasks';
import People from '/imports/ui/pages/project/tabs/people/people';
import Header from '/imports/ui/components/header/mainHeader';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Overview from './tabs/overview';

export default class SingleProject extends React.Component {
  constructor(props) {
    super(props);

    Tabs.setUseDefaultStyles(false);
  }
  render() {
    const { project } = this.props;
    const content = {
      header: project.name,
      subHeader: `Owner: ${project.ownerName}`,
      rightSide: {
        name: 'SingleProject',
        project,
        isOwner: this.props.isOwner
      }
    };
    return (
      <div className="page-main-content page-project">
        <Header content={content} />
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
            <People projectId={project._id} />
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
