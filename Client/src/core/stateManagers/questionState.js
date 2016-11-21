import {Map, List} from 'immutable';

export function NewQuestion(questions, question)
{
  return questions.push( Map( { title : question.title, id : question.id, answers : List( [ Map({title:'answer1', score: 12, key:1}),  Map({title:'answer2', score: 55, key : 2})]) }))
}
