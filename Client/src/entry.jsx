import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {AppContainer} from './components/App';
import reducer from './core/reducer'
import thunk from 'redux-thunk'
import persistState from './core/middleware/persistState'


const store = createStore(
  reducer,
  applyMiddleware(thunk, persistState)
)

/*
const routes = <Route component={App}>
  <Route path="/" component={LandingContainer} />
  <Route path="/question/:questionId" component={QuestionContainer} />

</Route>
*/

ReactDOM.render(
  <Provider store={store}>
    <AppContainer/>
  </Provider>,
  document.getElementById('app')
)

module.hot.accept()
