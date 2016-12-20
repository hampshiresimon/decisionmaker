import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import * as actionCreators from '../../core/actionCreator';
import {List, Map} from 'immutable';



class WizardAnswer extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      answerText : ''
    }

    this.handleAnswerChange = this.handleAnswerChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleAnswerChange(event) {
    this.setState({answerText: event.target.value});
    this.props.valueChanged(this.props.answerId, event.target.value)
  }

  getPlaceholder() {
    return 'Outcome ' + this.props.answerId
  }

  render() {

    return <div className='control-header-style'>
        <input placeholder={this.getPlaceholder()} type='text' className='form-control text-medium' value={this.state.answerText} onChange={this.handleAnswerChange}/>
      </div>
  }
}

WizardAnswer.propTypes = {
  valueChanged : React.PropTypes.func.isRequired,
  answerId : React.PropTypes.string
}

function mapStateToProps(state) {
  return {

  }
}

const WizardAnswerContainer = connect(
  mapStateToProps,
  actionCreators
)(WizardAnswer)

export { WizardAnswer, WizardAnswerContainer }
