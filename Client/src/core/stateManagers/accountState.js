import {Map, List} from 'immutable';
import * as Constants from '../constants'

export function SetAccountCreationStatus(account, status)
{
  return account.set('accountCreationStatus', status)
}

export function SetLoginStatus(state, status, questions)
{
  let loginStatusUpdate = state.setIn(['account','loginStatus'], status)

  if(status == Constants.LOGIN_STATE_LOGGED_IN) {
    loginStatusUpdate = loginStatusUpdate.setIn(['account','lastLogin'], getDateTime() )
  }

  if(questions) {
    loginStatusUpdate = loginStatusUpdate.set('questions', questions)
  }

  return loginStatusUpdate
}

export function SetAccountDetails(account, token, user)
{
  var tokenAccountUpdate = account.set('token', token)
  var userUpdate = tokenAccountUpdate.set('user', user)

  return userUpdate
}

function getDateTime() {
  var currentDate = new Date()
  var datetime = currentDate.getDate() + '/'
  + (currentDate.getMonth() + 1) + '/'
  + currentDate.getFullYear() + " @"
  + currentDate.getHours() + ":"
  + currentDate.getSeconds()

  return datetime
}
