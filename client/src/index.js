import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';
import awsConfig from './awsConfig';
import { Provider } from 'mobx-react';
// import { configure } from 'mobx';
import authStore from './stores/authStore';
import userStore from './stores/userStore';
import curricoosStore from './stores/curricooStore';
import promiseFinally from 'promise.prototype.finally';
import { BrowserRouter as Router } from 'react-router-dom';


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
