import React, { Component } from 'react';

import PeopleListItem from './item';

export default class PeopleList extends Component {
  constructor(props) {
    super(props);

    this.getPeople = this.getPeople.bind(this);
  }
  getPeople() {
    const { people, invitations } = this.props;
    const result = [];

    people.map(user => result.push({
      id: user._id,
      fullname: user.profile.fullname || '',
      avatar: user.profile.avatar || '/images/avatar.png',
      inProject: true
    }));
    invitations.map(invitation => result.push({
      id: invitation.user.id,
      fullname: invitation.user.fullname || '',
      avatar: invitation.user.avatar || '/images/avatar.png'
    }));

    return result.map(p =>
      <PeopleListItem
        key={p.id}
        id={p.id}
        fullname={p.fullname}
        avatar={p.avatar}
        inProject={p.inProject}
        project={this.props.project}
        owner={this.props.owner}
      />
    );
  }
  render() {
    return (
      <div className="list">
        {this.getPeople()}
      </div>
    );
  }
}

PeopleList.propTypes = {
  project: React.PropTypes.object,
  owner: React.PropTypes.object,
  people: React.PropTypes.array,
  invitations: React.PropTypes.array
};
