import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as actionCreators from '../core/actionCreator';
import uuid from 'uuid';
import {List, Map} from 'immutable';


class NewQuestion extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      questionText: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({questionText: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var uid = uuid.v1()
    this.props.newQuestionAction( Map({ title : this.state.questionText, id : uid }), this.props.question)
    browserHistory.push('/question/' + uid);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return <div className="ol-md-8 col-md-offset-2">
      <form onSubmit={this.handleSubmit}>
        <div>Question:</div>
        <div>
          <textarea value={this.state.questionText} onChange={this.handleChange}/>
          <input type="submit" value="GO" />
        </div>
      </form>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    //pair: state.getIn(['vote', 'pair']),
    //hasVoted: state.get('hasVoted'),
    //winner: state.get('winner')
  };
}

const NewQuestionContainer = connect(
  mapStateToProps,
  actionCreators
)(NewQuestion);

export { NewQuestion, NewQuestionContainer }
