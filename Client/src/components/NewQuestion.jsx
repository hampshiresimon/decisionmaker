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
      questionText: '',
      submitted : false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({questionText: event.target.value});
  }

  handleSubmit(event) {
    this.setState({submitted : true})
    event.preventDefault();

    if( this.state.questionText != '' ) {
      var uid = uuid.v1()
      this.props.newQuestionAction( Map({ title : this.state.questionText, id : uid }), this.props.question)
      browserHistory.push('/question/' + uid)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  showValidation() {
    if( this.state.questionText == '' && this.state.submitted) {
      return <div className='alert alert-warning control-padding'>
        Enter a description of your problem before continuing...
      </div>
    }
  }

  render() {
    return <div>
      <form onSubmit={this.handleSubmit}>
        <div className='form-group container-fluid'>
          <div>
            <div className='text-large'>
              Start making better decisions
            </div>
          {this.showValidation()}
            <textarea placeholder='Enter a description of your troublesome problem, e.g. should I buy that new pair of shoes?' className='form-control text-medium control-padding' value={this.state.questionText} onChange={this.handleChange}/>
          </div>
          <div className='input-button'>
            <input className='form-control control-padding btn btn-primary' type='submit' value='BEGIN >>' />
          </div>
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
