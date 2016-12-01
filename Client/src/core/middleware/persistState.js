import * as Constants from '../constants'

export default function createLogger({ getState }) {
  return (next) =>
  (action) => {

    const state = getState()
    const returnValue = next(action)

    // persist offline to server if we are logged in
    if(state.get('account').get('loginStatus') == Constants.LOGIN_STATE_LOGGED_IN) {

      var responsePromise = fetch('http://www.decision-maker.co.uk:3000/api/state', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': state.get('account').get('token')
        },
        body: JSON.stringify(
          state
        )
      }).then(a => {
        // should be persisted
        var httpStatus = a.status
      }).catch(e => {
        // do nothing but perhaps we need to think about some solution to this
      })
    }

    return returnValue
  }
}
