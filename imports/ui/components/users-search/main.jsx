import React from 'react';

import { getLocalState } from '/imports/startup/client/global';

export default class UsersSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });

    if (target.value && target.value.length > 3) {
      getLocalState().set('user-search-string', target.value);
    }
  }
  render() {
    return (
      <div className="users-search">
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

UsersSearch.propTypes = {
};
