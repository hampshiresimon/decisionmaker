import {Map, List} from 'immutable';

export function NewQuestion(questions, question)
{
  return questions.push( Map( { title : question.title, id : question.id, answers : List( [ Map({title:'bnswer1', score: 12, id:1}),  Map({title:'answer2', score: 55, id : 2})]) }))
}
