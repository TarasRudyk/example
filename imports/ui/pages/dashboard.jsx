import React from 'react';
import moment from 'moment';
import PageHeader from '/imports/ui/components/header/pageHeader';
import { Droppable } from 'react-drag-and-drop';
import { acceptTask } from '/imports/api/tasks/actions';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(data) {
    acceptTask(data._id);
  }
  render() {
    return (
      <div className="page-main-content page-dashboard">
        <PageHeader header={'Dashboard'} subHeader={'all your today tasks'} hx={1} />
        <Droppable
          className="container"
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
      </div>
    );
  }
}

Dashboard.propTypes = {
  tasks: React.PropTypes.array
};
