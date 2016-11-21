import React from 'react';
import clickOutside from 'react-click-outside';

import AssignUserItems from './items';
import AssignedUser from './assigned-user';

class AssignUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assignedUser: null,
      userQuery: '',
      filteredUsers: [],
      isItemsVissible: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleInputChange({ target }) {
    this.setState({
      isItemsVisible: true
    });

    this.setState({
      userQuery: target.value,
      filteredUsers: this.props.users.filter((u) => {
        const regex = new RegExp(target.value, 'i');
        return (u.username.match(regex) || u.profile.fullname.match(regex));
      })
    });
  }

  handleUserSelect(user) {
    this.setState({
      assignedUser: user
    });
    this.props.onAssigned(user);
  }

  handleClickOutside() {
    this.setState({
      isItemsVisible: false
    });
  }

  render() {
    let view;
    let assignedUser;

    if (this.state.assignedUser) {
      assignedUser = this.state.assignedUser;
    } else if (this.props.assignedUserId) {
      assignedUser = this.props.users.filter(u => u._id === this.props.assignedUserId)[0];
    }

    if (assignedUser) {
      view = <AssignedUser
        user={assignedUser}
        onDelete={() => { this.handleUserSelect(null); }}
      />;
    } else {
      view = (
        <div className="assign-user-main">
          <input
            type="text"
            name="username"
            autoComplete="off"
            placeholder="Type username"
            value={this.state.userQuery}
            onChange={this.handleInputChange}
            onFocus={this.handleInputChange}
          />
          <AssignUserItems
            isVisible={this.state.isItemsVisible}
            users={this.state.filteredUsers}
            onUserSelect={this.handleUserSelect}
          />
        </div>);
    }

    return view;
  }
}

AssignUser.propTypes = {
  assignedUserId: React.PropTypes.string,
  users: React.PropTypes.array,
  onAssigned: React.PropTypes.func
};

export default clickOutside(AssignUser);

