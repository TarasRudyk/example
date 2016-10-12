import React from 'react';

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

    if (this.refs['full-name'].value.trim() && this.refs.username.value.trim()) {
      Meteor.call('editUserData', {
        fullName: this.refs['full-name'].value.trim(),
        username: this.refs.username.value.trim()
      }, (error) => {
        if (!error) {
          FlowRouter.go('/');
        } else {
          console.error(error);
          this.setState({message: 'Error occured.'});
        }
      });
    } else {
      this.setState({message: 'Please fill all fields.'});
    }
  }
  render() {
    return (
      <div className="page-content">
        <h2>User info</h2>
        <form onSubmit={this.saveData}>
          <img src={this.props.userData && this.props.userData.profile && this.props.userData.profile.avatar ? this.props.userData.profile.avatar : ''}></img>
          <input type="text" ref="full-name" placeholder="Enter new full name" defaultValue={this.props.userData && this.props.userData.profile && this.props.userData.profile.fullName ? this.props.userData.profile.fullName : ''} />
          <input type="text" ref="username" placeholder="Enter new username" defaultValue={this.props.userData && this.props.userData.profile && this.props.userData.profile.username ? this.props.userData.profile.username : ''} />
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
