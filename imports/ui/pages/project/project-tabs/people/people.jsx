import React from 'react';
import PeopleList from './list';

export default class People extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>People</h1>
        <PeopleList />
      </div>
    );
  }
}
