import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { inject }  from 'mobx-react';
import {
  Home,
  Login,
  Signup,
  Header,
  ViewCurricoo
} from '../components';

class App extends Component {
  componentDidMount() {
    this.props.userStore.pullUser();
  }

  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/curricoos/:curricooId" component={ViewCurricoo} />
        </Switch>
      </>
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
