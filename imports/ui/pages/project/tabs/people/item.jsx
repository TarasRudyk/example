import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { deleteUserFromProject } from '/imports/api/projects/actions';


export default class PeopleListItem extends Component {
  constructor() {
    super();
    this.state = {};

    this.delete = this.delete.bind(this);
    this.isThisUserOwner = this.isThisUserOwner.bind(this);
  }
  delete() {
    deleteUserFromProject(this.props.project._id, this.props.id);
  }
  isThisUserOwner() {
    return Meteor.userId() === this.props.project.ownerId;
  }
  render() {
    return (
      <div className="list-item">
        <a href={`/profile/${this.props.id}`}>
          <span>{this.props.fullname}</span>
        </a>
        {this.props.inProject ? <span>In project</span> : <span>Pending</span>}
        {this.isThisUserOwner() ? <button onClick={this.delete}>Delete</button> : ''}
      </div>
    );
  }
}

PeopleListItem.propTypes = {
  id: React.PropTypes.string,
  fullname: React.PropTypes.string,
  inProject: React.PropTypes.bool,
  project: React.PropTypes.object
};
