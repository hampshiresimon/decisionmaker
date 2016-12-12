import * as actionTypes from './actionTypes';
import * as Constants from './constants'
import {Map, List, fromJS} from 'immutable'

export function newQuestionAction(question)
{
  return { type : actionTypes.NEW_QUESTION, question : question }
}

export function newAnswerAction(answer, question)
{
  return { type : actionTypes.NEW_ANSWER, answer : answer, question : question }
}

export function removeAnswerAction(answerId, question)
{
  return { type : actionTypes.REMOVE_ANSWER, answerId : answerId, question : question }
}

export function newConsiderationAction(consideration, answer, question)
{
  return { type : actionTypes.NEW_CONSIDERATION, consideration : consideration, answer : answer, question : question }
}

export function updateConsiderationAction( consideration, answer, question )
{
  return { type : actionTypes.UPDATE_CONSIDERATION, consideration : consideration, answer : answer, question : question }
}

export function removeConsiderationAction( considerationId, answer, question )
{
  return { type : actionTypes.REMOVE_CONSIDERATION, considerationId : considerationId, answer : answer, question : question }
}

export function accountCreationStatusUpdateAction(status)
{
  return { type : actionTypes.ACCOUNT_CREATION_STATUS_CHANGE, status : status }
}

export function loginStatusUpdateAction(status, questions)
{
  return { type : actionTypes.LOGIN_STATUS_CHANGE, status : status, questions : questions }
}

export function accountDetailsAction(token, user)
{
  return { type : actionTypes.ACCOUNT_DETAILS, token : token, user : user }
}

export function createAccountAction(account)
{
  return function (dispatch)
  {

    dispatch(accountCreationStatusUpdateAction(Constants.ACCOUNT_STATE_IN_PROGRESS))

    var responsePromise = fetch('http://www.decision-maker.co.uk:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        account
      )
    }).catch(e => {
      dispatch(accountCreationStatusUpdateAction(Constants.ACCOUNT_STATE_FAILED))
    })

    var responseTextPromise = responsePromise.then((response) => {
      return response.text()
    })

    return Promise.all([responsePromise, responseTextPromise]).then((values) => {

      let status = values[0].status
      let responseText = values[1]

      switch( status ) {
        case 201:
        // created
        var tokenObj = JSON.parse(responseText)

        dispatch(accountDetailsAction(tokenObj.token, account))
        dispatch(accountCreationStatusUpdateAction(Constants.ACCOUNT_STATE_SUCCESS))
        dispatch(loginStatusUpdateAction(Constants.LOGIN_STATE_LOGGED_IN, null))

        // persist to the server immediately
        var responsePromise = fetch('http://www.decision-maker.co.uk:3000/api/state', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth': getState().get('account').get('token')
          },
          body: JSON.stringify(
            getState()
          )
        }).then(a => {
          // should be persisted
          var httpStatus = a.status
        }).catch(e => {
          // do nothing but perhaps we need to think about some solution to this
        })
        
        break

        case 409:
        // username in use
        dispatch(accountCreationStatusUpdateAction(Constants.ACCOUNT_STATE_USERNAME_IN_USE))
        break

        default:
        // some other status which signifies a problem
        dispatch(accountCreationStatusUpdateAction(Constants.ACCOUNT_STATE_FAILED))
        break
      }
      return
    })
  }
}

export function loginAction(credentials)
{
  return function (dispatch, getState) {

    dispatch(loginStatusUpdateAction(Constants.LOGIN_STATE_IN_PROGRESS, null))

    var responsePromise = fetch('http://www.decision-maker.co.uk:3000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        credentials
      )
    }).catch(e => {
      dispatch(loginStatusUpdateAction(Constants.LOGIN_STATE_FAILED, null))
    })

    var responseTextPromise = responsePromise.then((response) => {
      return response.text()
    })

    return Promise.all([responsePromise, responseTextPromise]).then((values) => {

      let status = values[0].status
      let responseText = values[1]

      switch( status ) {
        case 200:
        // logged in
        var tokenObj = JSON.parse(responseText)

        // get the user details with state
        fetch('http://www.decision-maker.co.uk:3000/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth': tokenObj.token
          }
        }).then(response => {
          return response.json()
        }).then(response => {

          let serverQuestions = fromJS(response.state).get('questions')
          let localQuestions = getState().get('questions')
          let mergedQuestions = serverQuestions.concat(localQuestions)

          let user = fromJS(response).set('state', null)
          dispatch(accountDetailsAction(tokenObj.token, user))
          dispatch(loginStatusUpdateAction(Constants.LOGIN_STATE_LOGGED_IN, mergedQuestions))

          // persist to the server immediately
          var responsePromise = fetch('http://www.decision-maker.co.uk:3000/api/state', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth': getState().get('account').get('token')
            },
            body: JSON.stringify(
              getState()
            )
          }).then(a => {
            // should be persisted
            var httpStatus = a.status
          }).catch(e => {
            // do nothing but perhaps we need to think about some solution to this
          })

        }).catch(e => {
          dispatch(loginStatusUpdateAction(Constants.LOGIN_STATE_FAILED, null))
        })

        break

        default:
        // some other status which signifies a problem
        dispatch(loginStatusUpdateAction(Constants.LOGIN_STATE_FAILED, null))
        break
      }
      return
    })
  }
}
