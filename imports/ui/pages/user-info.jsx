import React from 'react';
import { saveData } from '/imports/api/users/actions.js';

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.saveData = this.saveData.bind(this);
  }
  saveData(event) {
    event.preventDefault();
    const fullName = this.refs['full-name'].value.trim(),
          username = this.refs.username.value.trim();

    saveData(fullName, username);
  }
  render() {
    return (
      <div className="page-content">
        <h2>User info</h2>
        <form onSubmit={this.saveData}>
          <img
            src={this.props.userData && this.props.userData.profile &&
              this.props.userData.profile.avatar ?
              this.props.userData.profile.avatar : ''}></img>
          <input type="text" ref="full-name" placeholder="Enter new full name"
             defaultValue={this.props.userData && this.props.userData.profile
               && this.props.userData.profile.fullName ?
               this.props.userData.profile.fullName : ''} />
          <input type="text" ref="username" placeholder="Enter new username"
            defaultValue={this.props.userData && this.props.userData.profile
              && this.props.userData.profile.username ?
              this.props.userData.profile.username : ''} />
          <input type="submit" />
        </form>
        <label>{this.state.message}</label>
      </div>
    );
  }
}

UserInfo.propTypes = {
  userData: React.PropTypes.object
};
