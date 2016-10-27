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
  render() {
    return (
      <div className="user-search">
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
          onCopy={this.handleChange}
        />
        <div className="user-search-items" style={{ display: this.state.users.length ? 'block' : 'none' }}>
          {this.state.users.map((u, i) => (
            <UserSearchItem key={i} user={u} />
          ))}
        </div>
      </div>
    );
  }
}

UserSearch.propTypes = {
  users: React.PropTypes.array
};
