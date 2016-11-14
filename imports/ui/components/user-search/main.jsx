import React from 'react';
import clickOutside from 'react-click-outside';

import UserSearchItem from '/imports/ui/components/user-search/item';
import NothingFound from '/imports/ui/components/user-search/nothing-found';

import { getLocalState } from '/imports/startup/client/local-state';

class UserSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      users: this.props.users,
      isOpened: false
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.focusIn = this.focusIn.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.users
    });
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });

    if (target.value && target.value.length > 3) {
      getLocalState().set('username-search', target.value);
      this.setState({ isOpened: true });
    } else {
      getLocalState().set('username-search', '');
      this.setState({
        users: [],
        isOpened: false
      });
    }
  }
  focusIn({ target }) {
    if (target.value && target.value.length > 3) {
      this.setState({ isOpened: true });
      getLocalState().set('username-search', target.value);
    }
  }
  handleClickOutside() {
    this.setState({ isOpened: false });
  }
  render() {
    return (
      <form className="user-search">
        <input
          type="text"
          name="username"
          autoComplete="off"
          placeholder="Type username"
          value={this.state.username}
          onChange={this.handleChange}
          onCopy={this.handleChange}
          onFocus={this.focusIn}
        />
        <div className="user-search-items" style={{ display: this.state.isOpened ? 'block' : 'none' }}>
          <div className="user-search-items-inner">
            {this.state.users.map((u, i) => (
              <UserSearchItem key={i} user={u} projectId={this.props.projectId} />
            ))}
            {this.state.users ? <NothingFound /> : ''}
          </div>
        </div>
      </form>
    );
  }
}

UserSearch.propTypes = {
  users: React.PropTypes.array,
  projectId: React.PropTypes.string
};

export default clickOutside(UserSearch);
