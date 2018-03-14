import React, { Component } from 'react';
import { auth, provider } from './Firebase.js';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.state = {
            setUserId: props.onLogin,
            user: null
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
                this.state.setUserId(user.uid);
            } 
        });
    }

    render() {
        var button;
        if (!this.state.user) {
            button = (<button onClick={this.logIn}>Log In</button>);
        } else {
            button = (
                <div>
                    <button className='avatar' onClick={this.logOut}>
                        <img className='avatar' alt='' src={this.state.user.photoURL} />
                    </button>
                </div>
            );
        }

        return (
            <div>
                {button}
            </div>
        );
    }

    logIn() {
        auth.signInWithPopup(provider) 
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
            });
    }

    logOut() {
        auth.signOut() 
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }
}