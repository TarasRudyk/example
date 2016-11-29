import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { deleteUserFromProject } from '/imports/api/projects/actions';


export default class PeopleListItem extends Component {
  constructor() {
    super();
    this.state = {};

    this.delete = this.delete.bind(this);
    this.getDeleteButton = this.getDeleteButton.bind(this);
    this.getUserStatus = this.getUserStatus.bind(this);
  }
  getDeleteButton() {
    if (Meteor.userId() === this.props.id) {
      return null;
    }
    if (Meteor.userId() === this.props.owner.id) {
      return <button className="button red small" onClick={this.delete}>Delete</button>;
    }

    return null;
  }
  getUserStatus() {
    if (!this.props.inProject) {
      return <div className="user-status pending">Pending</div>;
    }
    if (this.props.id === this.props.owner.id) {
      return <div className="user-status owner">Owner</div>;
    }

    return null;
  }
  delete() {
    deleteUserFromProject(this.props.project._id, this.props.id);
  }
  render() {
    return (
      <div className="list-item">
        <div className="people-list-item">
          <div className="avatar">
            <img src={this.props.avatar} alt={this.props.fullname} />
          </div>
          <div className="info">
            <div className="fullname">
              <a href={`/profile/${this.props.id}`}>{this.props.fullname}</a>
            </div>
            {this.getUserStatus()}
          </div>
          <div className="actions">
            {this.getDeleteButton()}
          </div>
        </div>
      </div>
    );
  }
}

PeopleListItem.propTypes = {
  id: React.PropTypes.string,
  fullname: React.PropTypes.string,
  avatar: React.PropTypes.string,
  inProject: React.PropTypes.bool,
  project: React.PropTypes.object,
  owner: React.PropTypes.object
};
