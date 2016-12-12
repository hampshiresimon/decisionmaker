import {Map, List} from 'immutable';

export function NewQuestion(questions, question)
{
  return questions.unshift( Map( { title : question.get('title'), id : question.get('id'), answers : List() }))
}
