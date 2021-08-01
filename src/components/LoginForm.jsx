import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';

import Form from '../common/Form';
import auth from '../services/authService';

export default class LoginForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = async () => {
    // Call the server
    try {
      const { username: email, password } = this.state.data;
      await auth.login(email, password); // jwt = javascript web tocken

      // this.props.history.replace('/');
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}
