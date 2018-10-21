import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from './awsConfig';
import { Provider } from 'mobx-react';
import { configure, observable, runInAction } from 'mobx';
import CurricoosStore from './stores/curricooStore';

// configure({ enforceActions: 'always' });
Amplify.configure(awsConfig);

const curricoosStore = new CurricoosStore();
const userStore = observable({ user: null });
Auth.currentAuthenticatedUser()
  .then(user => runInAction(() => userStore.user = user));

ReactDOM.render(
  <Provider
    userStore={userStore}
    curricoosStore={curricoosStore}
  >
    <App />
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
