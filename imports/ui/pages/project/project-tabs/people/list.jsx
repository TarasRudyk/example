import React, { Component } from 'react';

import PeopleListItem from './item';

export default class PeopleList extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <ul className="people-list">{this.props.people.map(p => <PeopleListItem key={p._id} person={p} />)}</ul>
    );
  }
}

PeopleList.propTypes = {
  people: React.PropTypes.array
};
