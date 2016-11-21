import {Map,List} from 'immutable';
import {NewQuestion} from './stateManagers/questionState';

export default function(state = Map( { questions : List() }), action) {

  switch (action.type) {
    case 'NEW_QUESTION':
      return state.update('questions',
                        q => NewQuestion(q, action.question))
    //case 'VOTE':
      //return vote(state, action.entry);
    }
  return state;
}
