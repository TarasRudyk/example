import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class ProjectItem extends React.Component {
  constructor(props) {
    super(props);

    this.getProjectGradient = this.getProjectGradient.bind(this);
    this.getProjectOwner = this.getProjectOwner.bind(this);
  }
  getProjectGradient() {
    const { project } = this.props;
    const { gradient } = project.users.find(elem => elem.id === Meteor.userId());

    return {
      background: `linear-gradient(${gradient.direction}, ${gradient.start}, ${gradient.stop})`
    };
  }
  getProjectOwner() {
    const { project } = this.props;
    const { id, fullname } = project.users.find(elem => elem.role === 'owner');

    return {
      ownerId: id,
      ownerFullname: fullname
    };
  }
  render() {
    const { _id, name, users } = this.props.project;
    const { ownerId, ownerFullname } = this.getProjectOwner();

    return (
      <div className="list-item">
        <div className="project-item">
          <div className="project-item-color">
            <div className="ring" style={this.getProjectGradient()} />
          </div>
          <div className="project-item-information">
            <div className="project-item-title"><a href={`/project/${_id}`}>{name}</a></div>
            <div className="project-item-subtitle">Owner: <a href={`/profile/${ownerId}`}>{ownerFullname}</a></div>
          </div>
          <div className="project-item-statistics">
            <div className="project-item-stat-block">{users.length} <span>people</span></div>
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
