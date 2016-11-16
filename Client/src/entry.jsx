import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import App from './components/App';
import Voting from './components/Voting';
import Test from './components/test';

const routes = <Route component={App}>
  <Route path="/" component={Voting} />
  <Route path="/test" component={Test} />
</Route>

ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById('app')
);

module.hot.accept()
