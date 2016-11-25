import * as actionTypes from './actionTypes'
import {Map,List} from 'immutable'
import {NewQuestion} from './stateManagers/questionState'
import {NewAnswer, RemoveAnswer} from './stateManagers/answerState'
import {NewConsideration, RemoveConsideration, UpdateConsideration} from './stateManagers/considerationState'
import {SetAccountCreationStatus, SetLoginStatus} from './stateManagers/accountState'
import * as constants from './constants'

export default function(state = Map( { questions : List(), account : Map( { loggedIn : false })}), action) {

  switch (action.type) {
    case actionTypes.NEW_QUESTION:
      return state.update('questions', q => NewQuestion(q, action.question))

    case actionTypes.NEW_ANSWER:
      const newAnswerQuestionIndex = state.get('questions').findIndex(q => {
        return q.get('id') === action.question.get('id');
      });

      return state.updateIn(['questions', newAnswerQuestionIndex], (question => NewAnswer(question, action.answer)))

    case actionTypes.REMOVE_ANSWER:
      const removeAnswerQuestionIndex = state.get('questions').findIndex(q => {
        return q.get('id') === action.question.get('id');
      });

      return state.updateIn(['questions', removeAnswerQuestionIndex], (question => RemoveAnswer(question, action.answerId)))

    case actionTypes.NEW_CONSIDERATION:
      const newConsiderationQuestionIndex = state.get('questions').findIndex(q => {
        return q.get('id') === action.question.get('id');
      });

      const newConsiderationAnswerIndex = state.getIn(['questions', newConsiderationQuestionIndex]).get('answers').findIndex(a => {
        return a.get('id') == action.answer.get('id')
      });

      return state.updateIn(['questions', newConsiderationQuestionIndex, 'answers', newConsiderationAnswerIndex], (answer => NewConsideration(answer, action.consideration)))

    case actionTypes.UPDATE_CONSIDERATION:
      const updateConsiderationQuestionIndex = state.get('questions').findIndex(q => {
        return q.get('id') === action.question.get('id');
      });

      const updateConsiderationAnswerIndex = state.getIn(['questions', updateConsiderationQuestionIndex]).get('answers').findIndex(a => {
        return a.get('id') == action.answer.get('id')
      });

      return state.updateIn(['questions', updateConsiderationQuestionIndex, 'answers', updateConsiderationAnswerIndex], (answer => UpdateConsideration(answer, action.consideration)))

    case actionTypes.REMOVE_CONSIDERATION:
      const removeConsiderationQuestionIndex = state.get('questions').findIndex(q => {
        return q.get('id') === action.question.get('id');
      });

      const removeConsiderationAnswerIndex = state.getIn(['questions', removeConsiderationQuestionIndex]).get('answers').findIndex(a => {
        return a.get('id') == action.answer.get('id')
      });

      return state.updateIn(['questions', removeConsiderationQuestionIndex, 'answers', removeConsiderationAnswerIndex], (answer => RemoveConsideration(answer, action.considerationId)))

    case actionTypes.ACCOUNT_CREATION_IN_PROGRESS:
      return state.updateIn('account', acc => SetAccountCreationStatus(acc, constants.ACCOUNT_CREATION_IN_PROGRESS))

    case actionTypes.ACCOUNT_CREATION_FAILED:
      return state.updateIn('account', acc => SetAccountCreationStatus(acc, constants.ACCOUNT_CREATION_FAILED))

    case actionTypes.ACCOUNT_CREATION_SUCCESS:
      return state.updateIn('account', acc => SetAccountCreationStatus(acc, constants.ACCOUNT_CREATION_SUCCESS))
  }
  return state;
}
