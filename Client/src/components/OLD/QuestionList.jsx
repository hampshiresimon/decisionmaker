import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../core/actionCreator';


class QuestionList extends React.Component{
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  getQuestions() {
    return this.props.questions || []
  }

getQuestionLink(question)
{
  return '/question/' + question.get('id')
}

  render() {

let a = this.getQuestions()

    return <div>
      {this.getQuestions().map(question =>
        <div key={question.get('id')}><Link to={this.getQuestionLink(question)}>{question.get('title')}</Link></div>
     )}
      </div>;
  }
}

function mapStateToProps(state) {
  return {

  }
}

const QuestionListContainer = connect(
  mapStateToProps,
  actionCreators
)(QuestionList)

export { QuestionList, QuestionListContainer }
