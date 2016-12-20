import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../core/actionCreator';
import {QuestionContainer} from './Question'


class MyQuestions extends React.Component{
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  getQuestions() {
    return this.props.questions || []
  }

  getPreviousQuestionText() {
    if( this.props.questions && !this.props.questions.isEmpty()) {
      return <div className='text-large'>
        Previous Questions
      </div>
    }
  }

  render() {

    return <div className='col-md-10 col-md-offset-1 panel-header-style'>
      {this.getPreviousQuestionText()}
      <div className='panel-group' id='question_accordion'>
        {this.getQuestions().map(question =>
          <QuestionContainer key={question.get('id')} question={question} />
        )}
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
