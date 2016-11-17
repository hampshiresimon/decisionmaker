import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import App from './components/App';
import Landing from './components/Landing';


const routes = <Route component={App}>
  <Route path="/" component={Landing} />

</Route>

ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById('app')
);

module.hot.accept()
