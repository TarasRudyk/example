import React from 'react';


export default class ProjectItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { name, ownerName, color } = this.props.project;

    return (
      <div className="list-item">
        <div className="project-item">
          <div className="project-item-color">
            <div className="ring" style={{ borderColor: color }}>#e32636</div>
          </div>
          <div className="project-item-information">
            <div className="project-item-title"><a href="/">{name}</a></div>
            <div className="project-item-subtitle">Owner: <a href="/">{ownerName}</a></div>
          </div>
          <div className="project-item-statistics">
            <div className="project-item-stat-block">5 <span>people</span></div>
            <div className="project-item-stat-block">28 <span>tasks</span></div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  project: React.PropTypes.object
};
