import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import * as actionCreators from '../core/actionCreator';
import {HeaderContainer} from './Header';
import {AccountContainer} from './Account';
import {AccountDisplayContainer} from './AccountDisplay';
import {NewQuestionContainer} from './NewQuestion'
import {MyQuestionsContainer} from './MyQuestions'
import {WizardContainer} from './wizard/Wizard'
var shallowCompare = require('react-addons-shallow-compare');
import * as Constants from '../core/constants'


class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      wizardInProgress : false,
      newQuestion : null
    }

    this.newQuestionAdded = this.newQuestionAdded.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  getAccountDisplay() {
    if( this.props.account.get('loginStatus') == Constants.LOGIN_STATE_LOGGED_IN) {
      return <AccountDisplayContainer account={this.props.account} />
    } else {
      return <AccountContainer account={this.props.account} />
    }
  }

  getMainDisplay() {
    if( !this.state.wizardInProgress ) {
      return <div>{this.getAccountDisplay()}
        <NewQuestionContainer newQuestion={this.newQuestionAdded}/>
        <MyQuestionsContainer questions={this.props.questions}/>
        </div>
    }
  }

  getWizardDisplay() {
    if( this.state.wizardInProgress ) {
      return <WizardContainer question={this.state.newQuestion}/>
    }
  }

  newQuestionAdded( question ) {
    this.setState( { wizardInProgress : true, newQuestion : question } )
  }

  render() {
    return <div>
      <div className='text-medium'>
        <HeaderContainer/>
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
