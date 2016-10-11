import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import md5 from 'js-md5';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPass: false,
            firstStep: true,
            message: ''
        };

        this.register = this.register.bind(this);
        this.togglePassVisibility = this.togglePassVisibility.bind(this);
    }
    render() {
        return (
            <div className="page-content">
                <form onSubmit={this.register}>
                    <input type="email" name="email" ref="email" placeholder="Email"/>
                    <input type={this.state.showPass ? 'text' : 'password'} ref="password" placeholder="Password"/>
                    <input type="checkbox" onChange={this.togglePassVisibility} />Show password
                        <input type="submit" value="Submit"/>
                    </form>
                    <label>{this.state.message}</label>
                </div>
            );
        }
        togglePassVisibility(event) {
            this.setState({showPass: event.target.checked});
        }
        register(event) {
            event.preventDefault();
            const isUsernameTaken = !this.state.firstStep ? Meteor.users.findOne({'profile.username':this.refs.username.value.trim()}) : undefined;

            if (this.refs.email.value.trim() && this.refs.password.value.trim()) {
                Accounts.createUser({
                    email: this.refs.email.value.trim().toLowerCase(),
                    password: this.refs.password.value.trim(),
                    profile: {
                        avatar: `https://www.gravatar.com/avatar/${md5(this.refs.email.value.trim().toLowerCase())}`
                    }
                }, (error) => {
                    if (!error) {
                        FlowRouter.go('/user-info');
                    }
                    else {
                        this.setState({message: error.reason});
                    }
                });
            }
            else if (!isUsernameTaken) {
                this.setState({message: 'Please fill all fields.'});
            }
            else if (isUsernameTaken) {
                this.setState({message: 'Username is already taken.'});
            }
        }
    }

    Signup.propTypes = {
        userData: React.PropTypes.object
    };
