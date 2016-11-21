import React from 'react';

import AssignUserItem from './item';

export default class AssignUserItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(event, user) {
    event.preventDefault();
    this.props.onUserSelect(user);
  }

  render() {
    let listContent;

    if (this.props.users.length !== 0) {
      listContent = this.props.users.map(u =>
        <AssignUserItem key={u._id} user={u} onClick={e => this.handleItemClick(e, u)} />);
    } else {
      listContent = <div className="assign-user-item">Nothing found</div>;
    }

    return !this.props.isVisible ? null : (<div className="assign-user-items">{listContent}</div>);
  }
}

AssignUserItems.propTypes = {
  users: React.PropTypes.array,
  isVisible: React.PropTypes.bool,
  onUserSelect: React.PropTypes.func
};
