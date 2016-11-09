import React, { Component } from 'react';

export default class PeopleListItem extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { fullname, avatar } = this.props.person.profile;
    return (
      <li className="people-list-item">
        <a href={`/profile/${this.props.person._id}`}>
          <img alt="avatar" src={avatar} />
          <span>{fullname}</span>
        </a>
      </li>
    );
  }
}

PeopleListItem.propTypes = {
  person: React.PropTypes.object
};
