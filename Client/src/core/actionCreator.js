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

export function newConsiderationAction(consideration, answer, question)
{
  return { type : "NEW_CONSIDERATION", consideration : consideration, answer : answer, question : question }
}

export function updateConsiderationAction( consideration, answer, question )
{
  return { type : "UPDATE_CONSIDERATION", consideration : consideration, answer : answer, question : question }
}

export function removeConsiderationAction( considerationId, answer, question )
{
  return { type : "REMOVE_CONSIDERATION", considerationId : considerationId, answer : answer, question : question }
}
