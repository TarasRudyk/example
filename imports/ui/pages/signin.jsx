import React from 'react';

export default class Signin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };

        this.login = this.login.bind(this);
    }
    render() {
        return (
            <div className="page-content">
                <form onSubmit={this.login}>
                    <input type="email" name="email" ref="email" placeholder="Email"/>
                    <input type="password" name="password" ref="password" placeholder="Password"/>
                    <input type="submit" value="Submit"/>
                </form>
                <label>{this.state.message}</label>
            </div>
        );
    }
    login(event) {
        event.preventDefault();
        const email = this.refs.email.value.trim().toLowerCase(),
            password = this.refs.password.value.trim();

        if (email && password) {
            Meteor.loginWithPassword(email, password, (data) => {
                if (!data && this.props.userData && this.props.userData.profile && this.props.userData.profile.username && this.props.userData.profile.fullName) {
                    FlowRouter.go('/');
                }
                else if (data) {
                    this.setState({message: 'Wrong email or password.'});
                }
                else if (!data && this.props.userData && this.props.userData.profile && !this.props.userData.profile.username || !data && this.props.userData && this.props.userData.profile && !this.props.userData.profile.fullName) {
                    FlowRouter.go('/user-info');
                }
            });
        }
        else {
            this.setState({message: 'Please fill all fields.'});
        }
    }
}

Signin.propTypes = {
    userData: React.PropTypes.object
};
