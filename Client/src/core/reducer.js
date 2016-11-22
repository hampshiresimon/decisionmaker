import {Map,List} from 'immutable';
import {NewQuestion} from './stateManagers/questionState';
import {NewAnswer, RemoveAnswer} from './stateManagers/answerState';

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

    }
  return state;
}
