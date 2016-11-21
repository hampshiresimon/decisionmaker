import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {List, Map} from 'immutable';
import * as actionCreators from '../core/actionCreator';


class Answers extends React.Component{
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

/*
  getQuestion()
  {
    return this.props.questions.get(this.getQuestionIndex())
  }

  getQuestionIndex()
  {
    return this.props.questions.findIndex(q => {
          return q.get('id') === this.props.params.questionId })
  }
  */

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {

    return <div>

      <div>
        {this.props.answers.map(c=> <h1 key={c.get('key')}><u>{c.get('title')}</u></h1>)}
      </div>


            </div>
    }
}

function mapStateToProps(state) {
  return {
    //answers : state.get('answers')
    //pair: state.getIn(['vote', 'pair']),
    //hasVoted: state.get('hasVoted'),
    //winner: state.get('winner')
  };
}

const AnswersContainer = connect(
  mapStateToProps,
  actionCreators
)(Answers);

export { Answers, AnswersContainer }
