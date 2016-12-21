import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import * as actionCreators from '../../core/actionCreator';
import {List, Map} from 'immutable';
import {WizardAnswersContainer} from './WizardAnswers'
import {WizardConsiderationsContainer} from './WizardConsiderations'
import {WizardSummaryContainer} from './WizardSummary'
import uuid from 'uuid';


const PageAnswers = 1
const PageConsiderations = 2
const PageSummary = 3


class Wizard extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      page : PageAnswers,
      currentAnswerId : 0,
      answers : null,
      scrollToTop : false
    }

    this.answersAdded = this.answersAdded.bind(this)
    this.considerationsAdded = this.considerationsAdded.bind(this)
    this.considerationsMounted = this.considerationsMounted.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate() {
      if(this.scrollToTop) {
        this.scrollToTop = null

        $("html, body").animate({ scrollTop: this.wizardDiv.offsetTop }, 300);
      }
  }

  answersAdded(answers) {
    // order the answers by Id and save - loop through them by index
    let orderedAnswers = answers.sort( (a,b) => a.get('id') - b.get('id'))
    this.setState( { page : PageConsiderations, answers : orderedAnswers } )
  }

  considerationsMounted() {
    this.scrollToTop = true
  }

  considerationsAdded(considerations) {
    // save the considerations on the answer
    let updatedAnswers =  this.state.answers.setIn( [ this.state.currentAnswerId, 'considerations' ], considerations )
    this.setState( { answers : updatedAnswers })

    let nextAnswerId = this.state.currentAnswerId + 1

    if( nextAnswerId == this.state.answers.size) {
      // we have reached the end of the available answers - save everything and move to summary
      this.complete( updatedAnswers )

    } else {
      // move to next answerState
      this.setState( { currentAnswerId : nextAnswerId })
    }
  }

  complete(answers) {

    // create the answers and considerations and save
    answers.forEach( answer => {

      let newAnswer = Map({ title : answer.get('title'), id : uuid.v1(), score : 0 })
      this.props.newAnswerAction( newAnswer, this.props.question )

      // create considerations
      answer.get('considerations').forEach( consideration => {

        let considerationId = uuid.v1()
        let newConsideration = Map({ title : consideration.get('title'), id : uuid.v1(), score : consideration.get('score') })
        this.props.newConsiderationAction( newConsideration, newAnswer, this.props.question )
      })
    })

    // show the summary
    this.scrollToTop = true
    this.setState( { page : PageSummary } )

  }



  renderWizard() {
    if( this.state.page == PageAnswers ) {
      return <WizardAnswersContainer nextClicked={this.answersAdded}  />
    } else if( this.state.page == PageConsiderations ) {
      // find the relevant answer
      let answer = this.state.answers.get(this.state.currentAnswerId)
      return <WizardConsiderationsContainer key={this.state.currentAnswerId} answerTitle={answer.get('title')} nextClicked={this.considerationsAdded} mounted={this.considerationsMounted} />
    } else if( this.state.page == PageSummary ) {

      let fullQuestion = this.props.questions.find( q => q.get('id') == this.props.question.get('id'))

      return <WizardSummaryContainer question={fullQuestion} finish={this.props.finish}/>
    }
  }

  render() {

    return <div className='col-md-10 col-md-offset-1 panel-header-style' ref={(top) => this.wizardDiv = top}>
      <div className='text-large'>
        Question. '{this.props.question.get('title')}'
      </div>
      <div>
        {this.renderWizard()}
      </div>
    </div>
  }
}

Wizard.propTypes = {
  question : React.PropTypes.instanceOf(Map),
  finish : React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    questions : state.get('questions')
  }
}

const WizardContainer = connect(
  mapStateToProps,
  actionCreators
)(Wizard)

export { Wizard, WizardContainer }
