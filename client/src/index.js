import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import { Provider } from 'mobx-react';
import promiseFinally from 'promise.prototype.finally';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import curricoosStore from './stores/curricooStore';
import authStore from './stores/authStore';
import userStore from './stores/userStore';
import awsConfig from './awsConfig';
import App from './components/App';
// import { configure } from 'mobx';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

promiseFinally.shim();

// configure({ enforceActions: 'always' });
Amplify.configure(awsConfig);

const stores = {
  curricoosStore,
  authStore,
  userStore
};

ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <App />
    </Router>
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
