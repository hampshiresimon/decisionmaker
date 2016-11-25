import * as actionTypes from './actionTypes';

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

export function accountCreationInProgressAction()
{
  return { type : actionTypes.ACCOUNT_CREATION_IN_PROGRESS }
}

export function accountCreationFailedAction()
{
  return { type : actionTypes.ACCOUNT_CREATION_FAILED }
}

export function accountCreationSuccessAction()
{
  return { type : actionTypes.ACCOUNT_CREATION_SUCCESS }
}

export function createAccountAction(account)
{
  return function (dispatch) {
    return fetch('http://www.decision-maker.co.uk:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
          { username : 'username'}
      )
    }).then((response) =>
    {
      return response.text()
    }).then((response) =>
    {
      alert(response)
    }).catch(e =>
    {
      alert('Error - ' + e)
    })
  }
}

/*).then(
sauce => dispatch(makeASandwich(forPerson, sauce)),
error => dispatch(apologize('The Sandwich Shop', forPerson, error))
);
};
fetch('/users')
.then(checkStatus)
.then(parseJSON)
.then(function(data) {
console.log('request succeeded with JSON response', data)
}).catch(function(error) {
console.log('request failed', error)
})
*/
