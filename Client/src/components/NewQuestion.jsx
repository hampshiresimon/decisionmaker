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
      let question = Map({ title : this.state.questionText, id : uid })
      this.props.newQuestionAction( question, this.props.question)
      this.setState( { submitted : false, questionText : ''})
      this.props.newQuestion( question )
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
    return   <div className='col-md-10 col-md-offset-1 panel-header-style'>
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <div>
              <div className='text-medium'>

              </div>
              <div className='control-header-style'>
              {this.showValidation()}
              <textarea placeholder='Enter a description of your problem' className='form-control text-medium control-padding' value={this.state.questionText} onChange={this.handleChange}/>
              </div>
            </div>
            <div className='control-header-style'>
              <input className='btn btn-primary text-medium' type='submit' value='start solving >>' />
            </div>
          </div>
        </form>
      </div>
    </div>
  }
}


NewQuestion.propTypes = {
  newQuestion : React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {

  }
}

const NewQuestionContainer = connect(
  mapStateToProps,
  actionCreators
)(NewQuestion);

export { NewQuestion, NewQuestionContainer }
