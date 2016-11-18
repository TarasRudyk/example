import React from 'react';
import clickOutside from 'react-click-outside';

import AssignUserItems from '/imports/ui/containers/components/assign-user-items';
import AssignedUser from './assigned-user';

class AssignUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assignedUser: null,
      userQuery: '',
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
      userQuery: target.value
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

    if (this.state.assignedUser) {
      view = <AssignedUser
        user={this.state.assignedUser}
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
            project={this.props.project}
            userQuery={this.state.userQuery}
            isVisible={this.state.isItemsVisible}
            onUserSelect={this.handleUserSelect}
          />
        </div>);
    }

    return view;
  }
}

AssignUser.propTypes = {
  project: React.PropTypes.object,
  onAssigned: React.PropTypes.func
};

export default clickOutside(AssignUser);

