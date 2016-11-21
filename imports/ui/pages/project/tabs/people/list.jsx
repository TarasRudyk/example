import React, { Component } from 'react';

import PeopleListItem from './item';

export default class PeopleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: []
    };

    this.getPeople = this.getPeople.bind(this);
  }
  getPeople() {
    const { people, invitations } = this.props;
    const result = [];

    people.map(user => result.push({
      id: user._id,
      fullname: user.profile.fullname || '',
      inProject: true
    }));
    invitations.map(invitation => result.push(invitation.user));

    return result.map(p =>
      <PeopleListItem
        key={p.id}
        id={p.id}
        fullname={p.fullname}
        inProject={p.inProject}
        project={this.props.project}
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
  people: React.PropTypes.array,
  invitations: React.PropTypes.array
};
