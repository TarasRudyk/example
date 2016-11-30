import React from 'react';
import Modal from 'react-modal';
import { TAPi18n } from 'meteor/tap:i18n';
import { acceptTask } from '/imports/api/tasks/actions';

export default class AcceptTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      assignedAt: '',
      isOpen: false,
      estimate: {
        value: 15,
        error: ''
      }
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleOnAssigned = this.handleOnAssigned.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);

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
        assignedAt: task.assignedAt || ''
      });
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.acceptEstimate();
  }

  handleOnAssigned(user) {
    const id = user ? user._id : '';
    this.setState({
      assignedAt: id
    });
  }

  handleClose() {
    this.props.onClose();
    this.setState({
      description: '',
      assignedAt: ''
    });
  }

  acceptEstimate() {
    if (this.state.estimate.value < 15) {
      this.setState({
        estimate: {
          value: this.state.estimate.value,
          error: TAPi18n.__('change.incorrectEstimate')
        }
      });
    } else {
      acceptTask(this.props.task._id, parseInt(this.state.estimate.value, 10));
      this.handleClose();
      this.setState({
        isOpen: false,
        estimate: {
          value: 15,
          error: ''
        }
      });
    }
  }

  handleChange({ target }) {
    if (target.name) {
      this.setState({
        [target.name]: {
          value: target.value,
          error: ''
        }
      });
    }
  }

  render() {
    return (
      <div className="">
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.handleClose}
          style={this.modalStyles}
        >
          <div className="accept-modal-content">
            <form onSubmit={this.handleFormSubmit}>
              <h1>Please, estimate this task</h1>
              <input
                className={this.state.estimate.error ? 'error' : ''}
                type="number"
                name="estimate"
                step="15"
                placeholder={this.state.estimate.value}
                value={this.state.estimate.value}
                onChange={this.handleChange}
              />
              <button type="button" onClick={this.handleClose}>Cancel</button>
              <button>Accept</button>
              <span className="field-error">{this.state.estimate.error}</span>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

AcceptTask.propTypes = {
  task: React.PropTypes.object,
  isOpen: React.PropTypes.bool,
  onClose: React.PropTypes.func
};
