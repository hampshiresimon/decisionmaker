import React from 'react';
import {connect} from 'react-redux';
import {AccountLoginContainer} from './AccountLogin'
import {QuestionListContainer} from './QuestionList'
var shallowCompare = require('react-addons-shallow-compare');
import * as actionCreators from '../core/actionCreator';
import * as Constants from '../core/constants'


class MyQuestions extends React.Component{
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  getLoginContainer() {
    if( this.props.account.get('loginStatus') != Constants.LOGIN_STATE_LOGGED_IN ) {
      return <div><AccountLoginContainer account={this.props.account}/></div>
    }
  }

  getQuestionsContainer() {
    if( this.props.account.get('loginStatus') == Constants.LOGIN_STATE_LOGGED_IN ) {
      return <div><QuestionListContainer questions={this.props.questions}/></div>
    }
  }

  render() {
    return <div>
      <div>
        My Saved Questions
      </div>
      <div>
        {this.getLoginContainer()}
        {this.getQuestionsContainer()}
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {

  }
}

const MyQuestionsContainer = connect(
  mapStateToProps,
  actionCreators
)(MyQuestions)

export { MyQuestions, MyQuestionsContainer }
