import React from 'react';

import { acceptInvitation } from '/imports/api/invitations/actions';

export default class InvitationItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.accept = this.accept.bind(this);
  }
  accept() {
    if (this.props.invitation) {
      acceptInvitation(this.props.invitation._id);
    }
  }
  render() {
    const { project } = this.props.invitation;

    return (
      <div className="list-item invitation-item">
        <div className="invitation-title">
          <span className="circle" style={{ background: project.color }} />
          New invitation
        </div>
        <div className="invitation-description">
          You are invited to the project:&nbsp;
          <a href={`/project/${project.id}`} className="blue">{project.name}</a>
        </div>
        <div className="invitation-actions">
          <a href="" className="button small red">Refuse</a>
          <a href="" className="button small green" onClick={this.accept}>Accept</a>
        </div>
      </div>
    );
  }
}

InvitationItem.propTypes = {
  invitation: React.PropTypes.object
};
