import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap/lib';
import { observer, inject }  from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SignupWrapper = styled.div`
  max-width: 28rem;
  height: 22rem;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid black;
  border-radius: 2rem;
`;

class Signup extends Component {
  render() {
    return (
      this.props.userStore.isUserConnected 
        ? <Redirect to='/' />
        : <SignupWrapper>
          <Form onSubmit={this.handleLogin}>
            <Form.Group controlId="signupForm.email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                ref={email => this.email = email}
                required
              />
            </Form.Group>
            <Form.Group controlId="signupForm.username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                ref={username => this.username = username}
                required
              />
            </Form.Group>
            <Form.Group controlId="signupForm.password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                ref={password => this.password = password}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ float: 'right' }}>
              Signup
            </Button>
          </Form>
          <p style={{ paddingTop: '0.5rem' }}>
            Already have an account? 
            <Link to='/login'>
              {' '}Login!
            </Link>
          </p>
        </SignupWrapper>
    );
  }
}

Signup.propTypes = {
  userStore: PropTypes.object,
  authStore: PropTypes.object,
  history: PropTypes.object
};

const ConnectedSignup = inject(
  'userStore',
  'authStore'
)(observer(Signup));
export default ConnectedSignup;