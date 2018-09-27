import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import 'normalize.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import Root from './Root/Root';

const history = createHistory();

ReactDOM.render(
  <Router history={history}>
    <Root />
  </Router>,
  document.getElementById('root'));
registerServiceWorker();
