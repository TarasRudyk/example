import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FlowRouter } from 'meteor/kadira:flow-router';
import PageHeader from '/imports/ui/components/header/pageHeader';
import AcceptTask from '/imports/ui/containers/pages/project/tabs/tasks/accept-task';
import ReassignTask from '/imports/ui/containers/pages/project/tabs/tasks/reassign-task';
import History from '/imports/ui/containers/pages/project/tabs/tasks/history';
import TaskTimelogs from '/imports/ui/containers/pages/project/tabs/tasks/time-logs';
import Messages from '/imports/ui/containers/pages/project/tabs/tasks/messages';
import { removeTask, reassignTask, completeTask } from '/imports/api/tasks/actions';

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
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.canEdit = this.canEdit.bind(this);
    this.isAcceptVisible = this.isAcceptVisible.bind(this);
    this.isCompleteVisible = this.isCompleteVisible.bind(this);
  }

  componentDidMount() {
    this.tabIndex = Number(FlowRouter.getQueryParam('tab')) || 0;
    FlowRouter.setQueryParams({ tab: this.tabIndex });
  }
  canEdit() {
    if (this.props.task._id) {
      return (Meteor.userId() === this.props.task.author.id) ||
        (Meteor.userId() === this.props.task.assignedTo);
    }
    return false;
  }
  isAcceptVisible() {
    return (
      this.canEdit() &&
      Meteor.userId() === this.props.task.assignedTo &&
      !this.props.task.isAccepted
    );
  }
  isCompleteVisible() {
    const { isAccepted, completeness } = this.props.task;
    return (
      this.canEdit() &&
      Meteor.userId() === this.props.task.assignedTo &&
      !completeness.isCompleted &&
      isAccepted
    );
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
  handleTabSelect(index) {
    this.tabIndex = index;
    FlowRouter.setQueryParams({ tab: index });
  }
  handleComplete() {
    completeTask(this.props.task._id);
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
        <Tabs selectedIndex={this.tabIndex} onSelect={this.handleTabSelect}>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>History</Tab>
            <Tab>Time logs</Tab>
            <Tab>Messages</Tab>
          </TabList>
          <TabPanel>
            <p>name: {name}</p>
            <p>description: {description}</p>
            <p>Start at: {startAt ? startAt.toString() : ''}</p>
            <p>Assigned at: {assignedTo}</p>
            {this.canEdit() ? <button onClick={this.handleRemove}>Remove</button> : ''}
            {this.canEdit() ? <button onClick={this.handleReassign}>Reassign</button> : ''}
            {this.isAcceptVisible() ? <button onClick={this.handleAccept}>Accept</button> : ''}
            {this.isCompleteVisible() ? <button onClick={this.handleComplete}>Complete</button> : ''}
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
              projectId={this.props.task.projectId}
            />
            <Messages target={this.props.task} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

Task.propTypes = {
  task: React.PropTypes.object
};
