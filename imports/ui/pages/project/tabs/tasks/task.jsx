import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PageHeader from '/imports/ui/components/header/pageHeader';
import AcceptTask from '/imports/ui/containers/pages/project/tabs/tasks/accept-task';
import ReassignTask from '/imports/ui/containers/pages/project/tabs/tasks/reassign-task';
import History from '/imports/ui/containers/pages/project/tabs/tasks/history';
import TaskTimelogs from '/imports/ui/containers/pages/project/tabs/tasks/time-logs';
import { removeTask, reassignTask } from '/imports/api/tasks/actions';

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    this.limit = 3;
    this.state = {
      isReassignModalOpen: false,
      isAcceptModalOpen: false,
      itemsToLoad: this.limit
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.handleReassign = this.handleReassign.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReassignSubmit = this.handleReassignSubmit.bind(this);
    this.handleReassignClose = this.handleReassignClose.bind(this);
    this.handleAcceptClose = this.handleAcceptClose.bind(this);
    this.handleHistoryLoadMore = this.handleHistoryLoadMore.bind(this);
    this.canEdit = this.canEdit.bind(this);
  }
  canEdit() {
    if (this.props.task._id) {
      return (Meteor.userId() === this.props.task.author.id) ||
        (Meteor.userId() === this.props.task.assignedTo);
    }
    return false;
  }
  handleRemove() {
    const conf = confirm('Remove this task?'); // eslint-disable-line
    if (conf) {
      removeTask(this.props.task._id);
    }
  }
  handleReassign() {
    this.setState({
      isReassignModalOpen: true
    });
  }
  handleAccept() {
    this.setState({
      isAcceptModalOpen: true
    });
  }
  handleReassignSubmit({ assignedTo, description }) {
    if (this.props.task.assignedTo !== assignedTo) {
      reassignTask(this.props.task._id, description, assignedTo);
    }
  }
  handleReassignClose() {
    this.setState({
      isReassignModalOpen: false
    });
  }
  handleAcceptClose() {
    this.setState({
      isAcceptModalOpen: false
    });
  }
  handleHistoryLoadMore(loadedItemsCount) {
    this.setState({ itemsToLoad: loadedItemsCount + this.limit });
  }
  isAcceptVisible() {
    return (
      this.canEdit() &&
      Meteor.userId() === this.props.task.assignedTo &&
      !this.props.task.isAccepted
    );
  }
  render() {
    const { _id, name, description, startAt, assignedTo } = this.props.task;
    return (
      <div className="page-main-content page-create-project">
        <PageHeader header={name} hx={1} />
        <ReassignTask
          task={this.props.task}
          isOpen={this.state.isReassignModalOpen}
          onSubmit={this.handleReassignSubmit}
          onClose={this.handleReassignClose}
        />
        <AcceptTask
          task={this.props.task}
          isOpen={this.state.isAcceptModalOpen}
          onClose={this.handleAcceptClose}
        />
        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>History</Tab>
            <Tab>Time logs</Tab>
          </TabList>
          <TabPanel>
            <p>name: {name}</p>
            <p>description: {description}</p>
            <p>Start at: {startAt ? startAt.toString() : ''}</p>
            <p>Assigned at: {assignedTo}</p>
            {this.canEdit() ? <button onClick={this.handleRemove}>Remove</button> : ''}
            {this.canEdit() ? <button onClick={this.handleReassign}>Reassign</button> : ''}
            {this.isAcceptVisible() ? <button onClick={this.handleAccept}>Accept</button> : ''}
          </TabPanel>
          <TabPanel>
            <History
              taskId={_id}
              limit={this.state.itemsToLoad}
              onLoadMore={this.handleHistoryLoadMore}
            />
          </TabPanel>
          <TabPanel>
            <TaskTimelogs
              taskId={_id}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

Task.propTypes = {
  task: React.PropTypes.object
};
