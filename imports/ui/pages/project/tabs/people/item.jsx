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
    deleteUserFromProject(this.props.project._id, this.props.person._id);
  }
  isThisUserOwner() {
    return Meteor.userId() === this.props.project.ownerId;
  }
  render() {
    const { fullname, avatar } = this.props.person.profile;
    return (
      <li className="people-list-item">
        <a href={`/profile/${this.props.person._id}`}>
          <img alt="avatar" src={avatar} />
          <span>{fullname}</span>
        </a>
        {this.isThisUserOwner() ? <button onClick={this.delete}>Delete</button> : ''}
      </li>
    );
  }
}

PeopleListItem.propTypes = {
  project: React.PropTypes.object,
  person: React.PropTypes.object
};
