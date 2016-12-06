import React from 'react';
import Modal from 'react-modal';

import AssignUser from '/imports/ui/containers/components/assign-user';

export default class ReassignTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      assignedTo: ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleOnAssigned = this.handleOnAssigned.bind(this);
    this.handleOnDescriptionChange = this.handleOnDescriptionChange.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.modalStyles = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
      content: {
        top: 105,
        left: 0,
        right: 0,
        bottom: 'initial',
        margin: 'auto',
        width: '272px',
        backgroundColor: '#f8f8f8'
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const task = nextProps.task;
    if (task && this.state.taskId !== task._id) {
      this.setState({
        assignedTo: task.assignedTo || ''
      });
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state);

    this.handleClose();
  }

  handleOnAssigned(user) {
    const id = user ? user._id : '';
    this.setState({
      assignedTo: id
    });
  }

  handleOnDescriptionChange(event) {
    event.preventDefault();

    this.setState({
      description: event.target.value
    });
  }

  handleClose() {
    this.props.onClose();
    this.setState({
      description: '',
      assignedTo: ''
    });
  }

  render() {
    return (
      <div className="reassign-task">
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.handleClose}
          style={this.modalStyles}
        >
          <div className="reassign-modal-content">
            <form onSubmit={this.handleFormSubmit}>
              <AssignUser
                project={this.props.project}
                onAssigned={this.handleOnAssigned}
                assignedUserId={this.state.assignedTo}
              />
              <textarea
                value={this.state.description}
                onChange={this.handleOnDescriptionChange}
              />
              <button type="button" onClick={this.handleClose}>Cancel</button>
              <button>Reassign</button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

ReassignTask.propTypes = {
  task: React.PropTypes.object, // eslint-disable-line 
  project: React.PropTypes.object,
  isOpen: React.PropTypes.bool,
  onSubmit: React.PropTypes.func,
  onClose: React.PropTypes.func
};
