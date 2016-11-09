import React from 'react';
import PeopleList from '/imports/ui/containers/pages/project/people/people-list';
import UserSearch from '/imports/ui/containers/components/user-search/main';


export default class People extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="list">
          {this.props.invitations.map((inv, i) => (
            <div className="list-item" key={i}>
              Waiting for a response from <a href={`/profile/${inv.user.id}`}>{inv.user.fullname}</a>
            </div>
          ))}
        </div>
        <UserSearch projectId={this.props.project._id} />
        <PeopleList project={this.props.project} />
      </div>
    );
  }
}

People.propTypes = {
  project: React.PropTypes.object,
  invitations: React.PropTypes.array
};
