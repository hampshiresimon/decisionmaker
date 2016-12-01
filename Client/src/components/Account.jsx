import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import * as actionCreators from '../core/actionCreator';
import {AccountCreateContainer} from './AccountCreate'
import {AccountLoginContainer} from './AccountLogin'


class Account extends React.Component{
  constructor(props) {
    super(props)
    this.state = {

    }

/*
    this.newAnswer = this.newAnswer.bind(this)
    this.removeAnswer = this.removeAnswer.bind(this)
    this.showConsiderations = this.showConsiderations.bind(this)
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    */
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

/*
  handleAnswerChange(event) {
    this.setState({answerText: event.target.value});
  }

  handleAnswerSubmit(event) {

    event.preventDefault();
    var uid = uuid.v1()
    this.props.newAnswerAction( Map({ title : this.state.answerText, id : uid, score : 0 }), this.props.question )
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
*/



  render() {
    return <div><div><AccountCreateContainer account={this.props.account} /></div>
            <div><AccountLoginContainer account={this.props.account} /></div>
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

const AccountContainer = connect(
  mapStateToProps,
  actionCreators
)(Account);

export { Account, AccountContainer }
