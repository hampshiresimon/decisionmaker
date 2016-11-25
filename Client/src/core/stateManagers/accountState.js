import {Map, List} from 'immutable';
import * as Constants from '../constants'

export function SetAccountCreationStatus(account, status)
{
  return account.set('accountCreationStatus', status)
}

export function SetLoginStatus(account, status)
{
  var loginStatusUpdate = account.set('loginStatus', status)
  if( status == Constants.LOGIN_STATE_LOGGED_IN)
  {
    return loginStatusUpdate.set('lastLogin', getDateTime() )
  }
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
