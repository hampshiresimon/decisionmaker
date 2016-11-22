export function newQuestionAction(question)
{
  return { type : 'NEW_QUESTION', question : question }
}

export function newAnswerAction(answer, question)
{
  return { type : 'NEW_ANSWER', answer : answer, question : question }
}

export function removeAnswerAction(answerId, question)
{
  return { type : 'REMOVE_ANSWER', answerId : answerId, question : question }
}
