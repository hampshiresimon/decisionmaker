import {Map,List} from 'immutable';
import {NewQuestion} from './stateManagers/questionState';
import {NewAnswer, RemoveAnswer} from './stateManagers/answerState';
import {NewConsideration, RemoveConsideration, UpdateConsideration} from './stateManagers/considerationState';

export default function(state = Map( { questions : List() }), action) {

  switch (action.type) {
    case 'NEW_QUESTION':
      return state.update('questions',
                        q => NewQuestion(q, action.question))

    case 'NEW_ANSWER':
      const newAnswerQuestionIndex = state.get('questions').findIndex(q => {
          return q.get('id') === action.question.get('id');
        });

      return state.updateIn(['questions', newAnswerQuestionIndex], (question => NewAnswer(question, action.answer)))

    case 'REMOVE_ANSWER':
        const removeAnswerQuestionIndex = state.get('questions').findIndex(q => {
            return q.get('id') === action.question.get('id');
          });

        return state.updateIn(['questions', removeAnswerQuestionIndex], (question => RemoveAnswer(question, action.answerId)))

    case 'NEW_CONSIDERATION':
        const newConsiderationQuestionIndex = state.get('questions').findIndex(q => {
            return q.get('id') === action.question.get('id');
          });

        const newConsiderationAnswerIndex = state.getIn(['questions', newConsiderationQuestionIndex]).get('answers').findIndex(a => {
          return a.get('id') == action.answer.get('id')
        });

        return state.updateIn(['questions', newConsiderationQuestionIndex, 'answers', newConsiderationAnswerIndex], (answer => NewConsideration(action.answer, action.consideration)))

    case 'UPDATE_CONSIDERATION':
        const updateConsiderationQuestionIndex = state.get('questions').findIndex(q => {
            return q.get('id') === action.question.get('id');
          });

        const updateConsiderationAnswerIndex = state.getIn(['questions', updateConsiderationQuestionIndex]).get('answers').findIndex(a => {
          return a.get('id') == action.answer.get('id')
        });

        return state.updateIn(['questions', updateConsiderationQuestionIndex, 'answers', updateConsiderationAnswerIndex], (answer => UpdateConsideration(action.answer, action.consideration)))

    case 'REMOVE_CONSIDERATION':
        const removeConsiderationQuestionIndex = state.get('questions').findIndex(q => {
            return q.get('id') === action.question.get('id');
          });

        const removeConsiderationAnswerIndex = state.getIn(['questions', removeConsiderationQuestionIndex]).get('answers').findIndex(a => {
          return a.get('id') == action.answer.get('id')
        });

        return state.updateIn(['questions', removeConsiderationQuestionIndex, 'answers', removeConsiderationAnswerIndex], (answer => RemoveConsideration(action.answer, action.considerationId)))
}
  return state;
}
