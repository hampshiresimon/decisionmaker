import React from 'react';
import {connect} from 'react-redux';
import {NewQuestionContainer} from './NewQuestion'
import {MyQuestionsContainer} from './MyQuestions'
var shallowCompare = require('react-addons-shallow-compare');
import * as actionCreators from '../core/actionCreator';


class Landing extends React.Component{
  constructor(props) {
    super(props)
    this.state = {

    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return <div className="container-fluid">
      <NewQuestionContainer/>
      <MyQuestionsContainer account={this.props.account} questions={this.props.questions}/>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    account : state.get('account'),
    questions : state.get('questions')
  }
}

const LandingContainer = connect(
  mapStateToProps,
  actionCreators
)(Landing)

export { Landing, LandingContainer }
