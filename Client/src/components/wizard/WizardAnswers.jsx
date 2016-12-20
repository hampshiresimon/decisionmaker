import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import * as actionCreators from '../../core/actionCreator';
import {List, Map} from 'immutable';
import {WizardAnswerContainer} from './WizardAnswer'



class WizardAnswers extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      numberOfAnswers : 4,
      answers : List(),
      submitted : false
    }

    this.addAnswer = this.addAnswer.bind(this)
    this.answerValueChanged = this.answerValueChanged.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleSubmit(event) {
    this.setState( { submitted : true })
    event.preventDefault();

    if( this.state.answers.size > 0 ) {
      this.props.nextClicked( this.state.answers )
    }
  }

  answerValueChanged(id, value) {

    var index = this.state.answers.findIndex(a => {
      return a.get('id') === id
    })

    if( index >= 0 && (!value || value == '')) {
      // existing answer which has been deleted
      let answerState = this.state.answers.filter((a) => a.get('id') !== id)
      this.setState( { answers : answerState })
    } else if( index == -1) {
      // no answer found - add one
      let answerState = this.state.answers.push( Map({ id : id, title : value }))
      this.setState( { answers : answerState })
    } else {
      // answer found - update
      let answerState = this.state.answers.filter((a) => a.get('id') !== id)
      let addedAnswer = answerState.push( Map({ id : id, title : value }))
      this.setState( { answers : addedAnswer })
    }
  }

  addAnswer() {

    let newNumberOfAnswers = this.state.numberOfAnswers + 1
    this.setState( { numberOfAnswers : newNumberOfAnswers })
  }

  showValidation() {
    if( this.state.submitted && this.state.answers.size == 0 ) {
      return <div className='alert alert-warning control-padding'>
        Ensure you have entered an outcome before continuing
      </div>
    }
  }

  render() {

    var answers = [];
    for (var i=1; i <= this.state.numberOfAnswers; i++) {
      answers.push(<WizardAnswerContainer key={i.toString()} answerId={i.toString()} valueChanged={this.answerValueChanged} />)
    }

    return <div className='control-header-style'>
      <div className='text-medium control-header-style'>
        You now need to list the possible outcomes for your question.
      </div>
      <div className='text-small control-header-style'>
        As an example, for the question 'Should I move jobs?', the outcomes may be:
        <div className='text-small control-header-style'>
          <ol>
            <li className='text-small'>No - stay where I am</li>
            <li className='text-small'>Yes - take the job in the city</li>
            <li className='text-small'>Yes - take the job closer to home</li>
          </ol>
        </div>
      </div>
      <div className='control-header-style'>
        {this.showValidation()}
      </div>
      <form onSubmit={this.handleSubmit} className='panel-style form-group'>
        <div>
          {answers}
        </div>
        <div onClick={this.addAnswer} className='cursor-hand control-header-style add-answer-container'>
          <span className='glyphicon glyphicon-plus-sign add-answer-glyph'/> <span className='add-answer-text'>add another outcome</span>
        </div>
        <div className='control-header-style'>
          <input className='btn btn-primary text-medium answers-next-button' type='submit' value='next >>' />
        </div>
      </form>

    </div>
  }
}

WizardAnswers.propTypes = {
  nextClicked : React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {

  }
}

const WizardAnswersContainer = connect(
  mapStateToProps,
  actionCreators
)(WizardAnswers)

export { WizardAnswers, WizardAnswersContainer }
