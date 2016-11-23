import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {List, Map} from 'immutable';
import * as actionCreators from '../core/actionCreator';
import {ConsiderationsContainer} from './Considerations'
import uuid from 'uuid';


class Answers extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      showConsiderationForAnswers : List(),
      answerText : ''
    }

    this.newAnswer = this.newAnswer.bind(this)
    this.removeAnswer = this.removeAnswer.bind(this)
    this.showConsiderations = this.showConsiderations.bind(this)
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
  }

  handleAnswerChange(event) {
    this.setState({answerText: event.target.value});
  }

  handleAnswerSubmit(event) {

    event.preventDefault();
    var uid = uuid.v1()
    this.props.newAnswerAction( Map({ title : this.state.answerText, id : uid, score : 0 }), this.props.question )
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  newAnswer(event) {
    event.preventDefault()
    this.props.newAnswer()
  }

  removeAnswer(event) {
    event.preventDefault()
    this.props.removeAnswerAction(event.currentTarget.dataset.id, this.props.question)
  }

  showConsiderations(event) {
    event.preventDefault()
    var answerId = event.currentTarget.dataset.id

    if( this.state.showConsiderationForAnswers.includes(answerId) )
    {
      this.setState({showConsiderationForAnswers : this.state.showConsiderationForAnswers.filter((item) => item === answerId)})
    } else {
      this.setState({showConsiderationForAnswers : this.state.showConsiderationForAnswers.push(answerId)})
    }
  }

  getAddConsideration(id)
  {

    if( this.state.showConsiderationForAnswers.includes(id))
    {
      var answer = this.props.question.get('answers').find((item) => item.get('id') === id)

        return <div>
            <ConsiderationsContainer question={this.props.question} answer={answer}/>
        </div>
    }

    return <div/>
  }

  render() {

    /* order by highest score first */
    var answers = this.props.question.get('answers').sort( (a,b) => b.get('score') - a.get('score'))

    return <div>
      <div>
        <form onSubmit={this.handleAnswerSubmit}>

          <div>
            <input type='text' value={this.state.answerText} onChange={this.handleAnswerChange}/>
            <input type="submit" value="ADD" />
          </div>
        </form>
      </div>
      <div>
        {answers.map(c=>
          <div>
            <h1 key={c.get('id')}>
              <u>{c.get('title')}</u> - {c.get('score')}</h1>
              <u data-id={c.get('id')} onClick={this.removeAnswer}>REMOVE</u>
              <u data-id={c.get('id')} onClick={this.showConsiderations}>SHOW CONSIDERATIONS</u>
              <div>
                {this.getAddConsideration(c.get('id'))}
              </div>
            </div>
          )
        }
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
