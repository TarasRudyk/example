import React from 'react';

import UserSearchItem from '/imports/ui/components/user-search/item';

import { getLocalState } from '/imports/startup/client/local-state';

export default class UserSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      users: this.props.users
    };

    this.handleChange = this.handleChange.bind(this);
    this.focusIn = this.focusIn.bind(this);
    this.focusOut = this.focusOut.bind(this);
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
    } else {
      getLocalState().set('username-search', '');
      this.setState({
        users: []
      });
    }
  }
  focusIn({ target }) {
    if (target.value && target.value.length > 3) {
      getLocalState().set('username-search', target.value);
    }
  }
  focusOut() {
    getLocalState().set('username-search', '');
  }
  render() {
    return (
      <form className="user-search">
        <input
          type="text"
          name="username"
          autoComplete="off"
          value={this.state.username}
          onChange={this.handleChange}
          onCopy={this.handleChange}
          onBlur={this.focusOut}
          onFocus={this.focusIn}
        />
        <div className="user-search-items" style={{ display: this.state.users.length ? 'block' : 'none' }}>
          <div className="user-search-items-inner">
            {this.state.users.map((u, i) => (
              <UserSearchItem key={i} user={u} />
            ))}
          </div>
        </div>
      </form>
    );
  }
}

UserSearch.propTypes = {
  users: React.PropTypes.array
};
