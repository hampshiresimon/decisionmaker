import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Map, List} from 'immutable';
import * as actionCreators from '../core/actionCreator';
import {AnswersContainer} from './Answers'


class Question extends React.Component{
  constructor(props) {
    super(props)
    this.state = {

    }

    //this.handleChange = this.handleChange.bind(this);
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

  render() {
    var question = this.getQuestion()

    return <div className="container-fluid">
              <div>{question.get('title')}</div>
              <div><AnswersContainer answers={question.get('answers')}/></div>
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
