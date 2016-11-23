import {Map, List} from 'immutable';

export function NewAnswer(question, answer)
{
  return question.update( 'answers', answers => answers.push( Map( { title : answer.get('title'), id : answer.get('id'), score : 0, considerations : List() })))
}

export function RemoveAnswer(question, answerId)
{
  return question.update( 'answers', answers => answers.filter((a) => a.get('id') !== answerId ))
}
