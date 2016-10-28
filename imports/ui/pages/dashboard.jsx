import React from 'react';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <main className="page-content page-dashboard">
        <div className="page-separator">
          <div className="container hidden">
            <div className="page-dashboard-title">
              <i className="material-icons">today</i>
            </div>
          </div>
        </div>
        <div className="page-dashboard-content">
          <div className="page-dashboard-calendar">
            <div className="page-title"><h3>Tasks</h3></div>
          </div>
          <div className="page-dashboard-tasks">
            <div className="page-dashboard-tasks-inner">
              <div className="page-title">
                <h3>Tasks</h3>
                <div className="page-title-right-block">
                  <select />
                </div>
              </div>
              <div className="page-dashboard-tasks-list">
                <div className="task">
                  <div className="task-title">Head crab</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
