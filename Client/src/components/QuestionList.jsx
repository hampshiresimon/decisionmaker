import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {Link} from 'react-router';


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

  render() {
    return <div className="ol-md-8 col-md-offset-2">
      {this.getQuestions().map(question =>
        <div><Link to="/question">{question.title}</Link></div>
     )}
      </div>;
  }
}

export default QuestionList
