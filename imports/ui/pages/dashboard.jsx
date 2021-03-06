import React from 'react';
import moment from 'moment';
import PageHeader from '/imports/ui/components/header/pageHeader';
import { Droppable } from 'react-drag-and-drop';
import { acceptTask } from '/imports/api/tasks/actions';
import Modal from 'react-modal';
import DashboardCalendar from '/imports/ui/containers/pages/dashboard-calendar';
import { TAPi18n } from 'meteor/tap:i18n';

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      estimate: {
        value: 15,
        error: ''
      },
      chosenTaskId: '',
      chosenDay: moment().startOf('day'),
      startOfWeek: moment().startOf('isoweek')
    };

    this.onDrop = this.onDrop.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.acceptEstimate = this.acceptEstimate.bind(this);
    this.handleChoseDay = this.handleChoseDay.bind(this);
    this.handleClickNextWeek = this.handleClickNextWeek.bind(this);
    this.handleClickPreviousWeek = this.handleClickPreviousWeek.bind(this);
  }

  onDrop(data) {
    this.openModal();
    this.setState({
      chosenTaskId: data._id
    });
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({
      isOpen: false,
      chosenTaskId: '',
      estimate: {
        value: 15,
        error: ''
      }
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
      acceptTask(this.state.chosenTaskId, parseInt(this.state.estimate.value, 10));
      this.setState({
        isOpen: false,
        chosenTaskId: '',
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

  handleChoseDay({ currentTarget }) {
    const selectedDate = new Date(currentTarget.dataset.date);
    this.setState({ chosenDay: selectedDate });
  }

  handleClickNextWeek() {
    const startOfWeek = moment(this.state.startOfWeek).add(1, 'weeks');
    this.setState({
      startOfWeek: startOfWeek
    });
  }

  handleClickPreviousWeek() {
    const startOfWeek = moment(this.state.startOfWeek).subtract(1, 'weeks');
    this.setState({
      startOfWeek: startOfWeek
    });
  }

  render() {
    return (
      <div className="app-content app-dashboard">
        <PageHeader header={'Dashboard'} subHeader={'all your today tasks'} hx={1}>
          <DashboardCalendar
            choseDay={this.handleChoseDay}
            goNextWeek={this.handleClickNextWeek}
            goPreviousWeek={this.handleClickPreviousWeek}
            chosenDay={this.state.chosenDay}
            startOfWeek={this.state.startOfWeek}
          />
        </PageHeader>
        <Droppable
          className="container page-dashboard-content"
          types={['_id']}
          onDrop={this.onDrop}
        >
          {this.props.tasks.map((t, i) => (
            <div key={i}>
              <div className="list-item">
                <div className="project-item">
                  <div className="project-item-information">
                    <div className="project-item-title"><a href={`/project/${t.projectId}/task/${t._id}`}>{t.name}</a></div>
                    <div className="project-item-subtitle">Starts from: <a href="/">{moment(t.startAt).format('DD-MM-YYYY')}</a></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Droppable>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          style={customModalStyles}
          contentLabel={''}
        >
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
          <button onClick={this.acceptEstimate}>Accept</button>
          <button onClick={this.closeModal}>Cancel</button>
          <span className="field-error">{this.state.estimate.error}</span>
        </Modal>
      </div>
    );
  }
}

Dashboard.propTypes = {
  tasks: React.PropTypes.array
};
