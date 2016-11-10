import React, { Component } from 'react';
import { deleteUserFromProject } from '/imports/api/projects/actions';

import PeopleListItem from './item';

export default class PeopleList extends Component {
  constructor() {
    super();
    this.state = {};

    this.deleteUser = this.deleteUser.bind(this);
  }
  deleteUser(userId) {
    deleteUserFromProject(this.props.project._id, userId);
  }
  render() {
    return (
      <ul className="people-list">
        {this.props.people.map(p =>
          <PeopleListItem
            key={p._id}
            project={this.props.project}
            person={p}
            onDelete={this.deleteUser}
          />)}
      </ul>
    );
  }
}

PeopleList.propTypes = {
  project: React.PropTypes.object,
  people: React.PropTypes.array
};
