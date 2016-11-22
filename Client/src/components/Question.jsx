import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Map, List} from 'immutable';
import * as actionCreators from '../core/actionCreator';
import {AnswersContainer} from './Answers'
import {NewAnswerContainer} from './NewAnswer'


class Question extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      showNewAnswer : false
    }

    this.newAnswer = this.newAnswer.bind(this);
    this.newAnswerAdded = this.newAnswerAdded.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //this.setState({questionText: event.target.value});
  }

  handleSubmit(event) {
    //event.preventDefault();
    //this.props.newQuestionAction(this.state.questionText)
    //browserHistory.push('/some/path/123');
  }

  getQuestion()
  {
    return this.props.questions.find(q => {
          return q.get('id') === this.props.params.questionId })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  newAnswer() {
    this.setState({showNewAnswer : true});

  }

  newAnswerAdded() {
    this.setState({showNewAnswer : false});
  }

  render() {
    var question = this.getQuestion()

    let showNewAnswer;
       if (!!this.state.showNewAnswer) {
         showNewAnswer = (
           <div><NewAnswerContainer question={question} newAnswerAdded={this.newAnswerAdded}/></div>
         )
       }

    return <div className="container-fluid">
              <div>{question.get('title')}</div>
              <div><AnswersContainer question={question} newAnswer={this.newAnswer}/ ></div>

            {showNewAnswer}
            </div>
    }
}

function mapStateToProps(state) {
  return {
    questions : state.get('questions')
    //pair: state.getIn(['vote', 'pair']),
    //hasVoted: state.get('hasVoted'),
    //winner: state.get('winner')
  };
}

const QuestionContainer = connect(
  mapStateToProps,
  actionCreators
)(Question);

export { Question, QuestionContainer }
