import {Map, List} from 'immutable';

export function SetAccountCreationStatus(account, status)
{
  return account.set('accountCreationStatus', status)
}

export function SetLoginStatus(account, status)
{
  return account.set('loginStatus', status)
}
