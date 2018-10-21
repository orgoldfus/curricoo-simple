import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap/lib';
import NavigationMenu from './components/NavigationMenu';
import Home from './components/Home';
import ViewCurricoo from './components/ViewCurricoo';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Container fluid>
          <Row>
            <Col>
              <NavigationMenu />
            </Col>
          </Row>
          <Row>
            <Col>
              <Route exact path="/" component={Home} />
              <Route path="/curricoos/:curricooId" component={ViewCurricoo} />
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default App;
