import React from 'react';

export default class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <main className="page-content page-projects">
        <div className="container">
          <div className="page-title">
            <h1>Projects</h1>
            <div className="list">
              <div className="list-item">
                <div className="project-item">
                  <div className="project-item-color">
                    <div className="ring" style={{ borderColor: '#e32636' }}>#e32636</div>
                  </div>
                  <div className="project-item-information">
                    <div className="project-item-title"><a href="/">Workbooking</a></div>
                    <div className="project-item-subtitle">Owner: <a href="/">Inna Pavliv</a></div>
                  </div>
                  <div className="project-item-statistics">
                    <div className="project-item-stat-block">5 <span>people</span></div>
                    <div className="project-item-stat-block">28 <span>tasks</span></div>
                  </div>
                </div>
              </div>

              <div className="list-item">
                <div className="project-item">
                  <div className="project-item-color">
                    <div className="ring" style={{ borderColor: '#9966cc' }}>#a966cc</div>
                  </div>
                  <div className="project-item-information">
                    <div className="project-item-title"><a href="/">Pelorus</a></div>
                    <div className="project-item-subtitle">Owner: <a href="/">Alex Pletnov</a></div>
                  </div>
                  <div className="project-item-statistics">
                    <div className="project-item-stat-block">12 <span>people</span></div>
                    <div className="project-item-stat-block">5 <span>tasks</span></div>
                  </div>
                </div>
              </div>

              <div className="list-item">
                <div className="project-item">
                  <div className="project-item-color">
                    <div className="ring" style={{ borderColor: '#ffbf00' }}>#ffbf00</div>
                  </div>
                  <div className="project-item-information">
                    <div className="project-item-title"><a href="/">The karma</a></div>
                    <div className="project-item-subtitle">Owner: <a href="/">Sergey Gornostaev</a></div>
                  </div>
                  <div className="project-item-statistics">
                    <div className="project-item-stat-block">2 <span>people</span></div>
                    <div className="project-item-stat-block">10 <span>tasks</span></div>
                  </div>
                </div>
              </div>
            </div>

            <a href="/project/create" className="button green">Create new project</a>
          </div>
        </div>
      </main>
    );
  }
}
