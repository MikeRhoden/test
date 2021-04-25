import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Login.css';

function handleErrors(response) { 
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

async function loginUser(credentials) {
    return fetch('http://big12pickem.com/rpc/user/get/user.asp', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(handleErrors).then(data => data.json().catch()
    );
}

async function createUser(user) {
    return fetch('http://big12pickem.com/rpc/user/post/user.asp', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(handleErrors).then(data => data.json().catch()
    );
}

export default function Login({setToken}) {
    const [mode, setMode] = useState('login');

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [firstName, setFirstname] = useState();
    const [lastName, setLastname] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const [errorStyle, setErrorStyle] = useState({display: 'none'});
    const [formErrorMessage, setFormErrorMessage] = useState([]);

    let tempErrorMessages = [];

    const handleSignUpClick = (e) => {
        e.preventDefault();
        setFormErrorMessage([]);
        setMode('signup');
    }
    
    const handleLoginClick = (e) => {
        e.preventDefault();
        setFormErrorMessage([]);
        setMode('login');
    }
    
    const handleLoginSubmit = async (e) => {
        tempErrorMessages = [];
        try {
            e.preventDefault();

            if (username === '' || username === undefined) {
                tempErrorMessages.push('User name is blank.');
            }
            if (password === '' || username === undefined) {
                tempErrorMessages.push('Password is blank.');
            }
            if (tempErrorMessages.length > 0) {
                throw Error('Invalid');
            }

            await loginUser({
                username,
                password
            }).then(token => setToken(token))
        } catch(e) {
            if (e.message === 'Unauthorized') {
                setErrorStyle({display: 'block'});
                setFormErrorMessage(['Sorry!  Login failed.', 'Let someone (me) know if you need a reset.']);
            } else if (e.message === 'Invalid') {
                setErrorStyle({display: 'block'});
                setFormErrorMessage(tempErrorMessages);
           }
        }
    }

    const handleSignUpSubmit = async (e) => {
        tempErrorMessages = [];
        try {
            e.preventDefault();

            if (username === '' || username === undefined) {
                tempErrorMessages.push('User name is blank.');
            } else if (username.length < 6) { 
                tempErrorMessages.push('User name must be at least 6 characters.');
            }
            if (firstName === '' || firstName === undefined) {
                tempErrorMessages.push('First name is blank.');
            }
            if (lastName === '' || lastName === undefined) {
                tempErrorMessages.push('Last name is blank')
            }
            if (password === '' || password === undefined) {
                tempErrorMessages.push('Password is blank.');
            } else if (password.length < 6) {
                tempErrorMessages.push('Password must be at least 6 characters.')
            }
            if (confirmPassword === '' || confirmPassword === undefined) {
                tempErrorMessages.push('Password confirmation is blank.');
            }
            if (password !== confirmPassword) {
                tempErrorMessages.push('Password does not match confirm password.')
            }
            if (tempErrorMessages.length > 0) {
                throw Error('Invalid');
            }

            await createUser({
                username,
                firstName,
                lastName,
                password
            }).then(token => setToken(token))
            
        } catch(e) {
            if (e.message === 'Conflict') {
                setErrorStyle({display: 'block'});
                setFormErrorMessage(['Sorry!  That User Name already exists.']);
            } else if (e.message === 'Invalid') {
                setErrorStyle({display: 'block'});
                setFormErrorMessage(tempErrorMessages);
           }
        }    
    }

    if (mode === 'signup') {
        return (
            <div className="login-wrapper">
                <h3>big12pickem.com</h3>
                <h4>Sign Up!</h4>
                <form onSubmit={handleSignUpSubmit}>
                <label>
                        <p>Username</p>
                        <input
                            placeholder="User Name / Email"
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" />
                    </label>
                    <label>
                        <p>First Name</p>
                        <input
                            placeholder="First name"
                            onChange={(e) => setFirstname(e.target.value)}
                            type="text" />
                    </label>
                    <label>
                        <p>Last Name</p>
                        <input
                            placeholder="Last name"
                            onChange={(e) => setLastname(e.target.value)}
                            type="text" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" />
                    </label>
                    <label>
                        <p>Confirm Password</p>
                        <input
                            placeholder="confirm password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password" />
                    </label>
                    <p>
                        <button type="submit">Submit</button>
                        <a href="#" onClick={handleLoginClick} style={{display: 'inline', marginLeft: '1em'}}>back to log in</a>
                    </p>
                </form>
                <div className="login-error" style={errorStyle}>
                    <FormErrorMessage errorMessages={formErrorMessage} />
                </div>
            </div>
        );
    } else if (mode === 'login') {
        return (
            <div className="login-wrapper">
                <h3>big12pickem.com</h3>
                <h4>Sign In</h4>
                <form onSubmit={handleLoginSubmit}>
                    <label>
                        <p>Username</p>
                        <input
                            placeholder="User Name / Email"
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" />
                    </label>
                    <p>
                        <button type="submit" name="submit">Submit</button>
                        <a href="#" onClick={handleSignUpClick} style={{display: 'inline', marginLeft: '1em'}}>or sign up</a>
                    </p>
                </form>
                <div className="login-error" style={errorStyle}>
                    <FormErrorMessage errorMessages={formErrorMessage} />
                </div>
            </div>
        );
    }
}

function FormErrorMessage(props) {
    let errorCount = 0;
    const errorMessages = props.errorMessages.map((message) => {
        errorCount++;
        return <li key={errorCount}>{message}</li>
    });
    return (
        <ul className="login-error-messages">
            {errorMessages}
        </ul>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}