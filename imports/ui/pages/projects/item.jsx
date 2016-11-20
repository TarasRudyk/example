import React from 'react';


export default class ProjectItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { _id, name, ownerName } = this.props.project;
    const userProject = this.props.userProjects.find(elem => elem.projectId === _id);
    if (userProject) {
      return (
        <div className="list-item">
          <div className="project-item">
            <div className="project-item-color">
              <div className="ring" style={{ background: `repeating-linear-gradient(${userProject.color.gradient.direction}, ${userProject.color.gradient.start}, ${userProject.color.gradient.stop}` }} />
            </div>
            <div className="project-item-information">
              <div className="project-item-title"><a href={`/project/${_id}`}>{name}</a></div>
              <div className="project-item-subtitle">Owner: <a href="/">{ownerName}</a></div>
            </div>
            <div className="project-item-statistics">
              <div className="project-item-stat-block">5 <span>people</span></div>
              <div className="project-item-stat-block">28 <span>tasks</span></div>
            </div>
          </div>
        </div>
      );
    };
    return null;
  }
}

ProjectItem.propTypes = {
  project: React.PropTypes.object,
  userProjects: React.PropTypes.arrayOf(React.PropTypes.object)
};
