import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../core/actionCreator';
import {HeaderContainer} from './Header';
import {AccountDisplayContainer} from './AccountDisplay';
import {NewQuestionContainer} from './NewQuestion'
import {MyQuestionsContainer} from './MyQuestions'
import {WizardContainer} from './wizard/Wizard'
var shallowCompare = require('react-addons-shallow-compare');
import * as Constants from '../core/constants'

const PageLanding = 1
const PageWizard = 2

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      page : PageLanding,
      newQuestion : null
    }

    this.newQuestionAdded = this.newQuestionAdded.bind(this)
    this.wizardFinish = this.wizardFinish.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }



  getMainDisplay() {
    if( this.state.page == PageLanding ) {
      return <div>
        <NewQuestionContainer newQuestion={this.newQuestionAdded}/>
        <MyQuestionsContainer questions={this.props.questions}/>
        </div>
    }
  }

  getWizardDisplay() {
    if( this.state.page == PageWizard ) {
      return <WizardContainer question={this.state.newQuestion} finish={this.wizardFinish}/>
    }
  }

  wizardFinish() {
    this.setState( { page : PageLanding })
  }

  newQuestionAdded( question ) {
    this.setState( { page : PageWizard, newQuestion : question } )
  }

  render() {
    return <div>
      <div className='text-medium'>
        <HeaderContainer account={this.props.account}/>
        <div className='container-fluid'>
          {this.getMainDisplay()}
          {this.getWizardDisplay()}
        </div>
      </div>
    </div>
  }
}



function mapStateToProps(state) {
  return {
    account : state.get('account'),
    questions : state.get('questions')
  }
}

const AppContainer = connect(
  mapStateToProps,
  actionCreators
)(App)

export { App, AppContainer }
