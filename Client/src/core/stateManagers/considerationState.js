import {Map, List} from 'immutable';

export function NewConsideration(answer, consideration)
{
  var considerationMap = Map( { title : consideration.get('title'), id : consideration.get('id'), score : consideration.get('score') })
  var addedConsiderationState = answer.update( 'considerations', consideration => consideration.push( considerationMap ))

  // update the score on the answer based on it's considerations
  var totalScore = addedConsiderationState.get('considerations').reduce(function(sum, d) {
    return sum + d.get('score');
  }, 0);

  var updatedScoreState = addedConsiderationState.set('score', totalScore)

  return updatedScoreState
}

export function RemoveConsideration(answer, considerationId)
{
  return answer.update( 'considerations', consideration => consideration.filter((c) => c.get('id') !== considerationId ))
}

export function UpdateConsideration(answer, consideration)
{
  var index = answer.get('considerations').findIndex(q => {
    return q.get('id') === consideration.get('id');
  });

  var updatedConsiderations = answer.setIn(['considerations', index], consideration)

  // update the score on the answer based on it's considerations
  var totalScore = updatedConsiderations.get('considerations').reduce(function(sum, d) {
    return sum + d.get('score');
  }, 0);

  var updatedAnswer = updatedConsiderations.set('score', totalScore)

  return updatedAnswer
}
