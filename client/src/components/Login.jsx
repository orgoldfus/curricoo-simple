import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap/lib';
import { observer, inject }  from 'mobx-react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  handleLogin = (evt) => {
    evt.preventDefault();
    const loginData = {
      username: this.username.value,
      password: this.password.value
    };

    this.props.authStore.login(loginData);
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    return (
      this.props.userStore.isUserConnected 
        ? <Redirect to={from} />
        : <div>
          <Form onSubmit={this.handleLogin}>
            <Form.Group controlId="loginForm.username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                ref={username => this.username = username}
                required
              />
            </Form.Group>
            <Form.Group controlId="loginForm.password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={password => this.password = password}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
    );
  }
}

Login.propTypes = {
  userStore: PropTypes.object,
  authStore: PropTypes.object,
  location: PropTypes.object
};

const ConnectedLogin = inject(
  'userStore',
  'authStore'
)(observer(Login));
export default ConnectedLogin;