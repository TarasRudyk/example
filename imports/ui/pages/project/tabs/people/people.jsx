import React from 'react';

import PeopleList from '/imports/ui/containers/pages/project/tabs/people/list';
import UserSearch from '/imports/ui/containers/components/user-search/main';


export default class People extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="project-people">
        <div className="container">
          <PeopleList projectId={this.props.projectId} />
          <UserSearch projectId={this.props.projectId} />
        </div>
      </div>
    );
  }
}

People.propTypes = {
  projectId: React.PropTypes.string
};
