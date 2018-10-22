import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap/lib';
import Header from './Header';
import PropTypes from 'prop-types';
import Home from './Home';
import ViewCurricoo from './ViewCurricoo';
import Login from './Login';
import { Switch, Route } from 'react-router-dom';
import { inject }  from 'mobx-react';

class App extends Component {
  componentDidMount() {
    this.props.userStore.pullUser();
  }

  render() {
    return (
      <Container fluid>
        <Row><Col>
          <Header />
        </Col></Row>
        <Row><Col>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route path="/curricoos/:curricooId" component={ViewCurricoo} />
          </Switch>
        </Col></Row>
      </Container>
    );
  }
}

App.propTypes = {
  userStore: PropTypes.object
};

const ConnectedApp = inject(
  'userStore'
)(App);
export default ConnectedApp;
