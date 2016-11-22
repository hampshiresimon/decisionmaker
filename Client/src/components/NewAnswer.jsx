import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {List, Map} from 'immutable';
import * as actionCreators from '../core/actionCreator';
import uuid from 'uuid';


class NewAnswer extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      answerText : ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({answerText: event.target.value});
  }

  handleSubmit(event) {

    event.preventDefault();
    var uid = uuid.v1()
    this.props.newAnswerAction( { title : this.state.answerText, id : uid, score : 0 }, this.props.question )
    this.props.newAnswerAdded()
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

/*
  newAnswer(event) {
    event.preventDefault();
    this.props.newAnswer()
  }
  */

  render() {
    return <div className="ol-md-8 col-md-offset-2">
      <form onSubmit={this.handleSubmit}>
            <div>Answer:</div>
            <div>
              <textarea value={this.state.answerText} onChange={this.handleChange}/>
              <input type="submit" value="GO" />
            </div>
          </form>
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

const NewAnswerContainer = connect(
  mapStateToProps,
  actionCreators
)(NewAnswer);

export { NewAnswer, NewAnswerContainer }
