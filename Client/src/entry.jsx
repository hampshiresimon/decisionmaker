import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/App';
import Landing from './components/Landing';
import {QuestionContainer} from './components/Question';
import reducer from './core/reducer'


const store = createStore(reducer)

const routes = <Route component={App}>
  <Route path="/" component={Landing} />
  <Route path="/question/:questionId" component={QuestionContainer} />

</Route>

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

module.hot.accept()
