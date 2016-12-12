import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../core/actionCreator';
import uuid from 'uuid';
import {List, Map} from 'immutable';
import {AnswerContainer} from './Answer'


class Question extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      answer: '',
      submitted : false
    }

    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
  }

  componentDidMount() {
    // enure new popovers work
    $('[data-toggle="popover"]').popover();
  }


  handleAnswerChange(event) {
    this.setState({answer: event.target.value});
  }

  handleAnswerSubmit(event) {

    this.setState( { submitted : true} )
    event.preventDefault();

    if( this.state.answer != '') {
      var uid = uuid.v1()
      this.props.newAnswerAction( Map({ title : this.state.answer, id : uid, score : 0 }), this.props.question )

      this.setState( { submitted : false, answer : '' } )
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  getHref() {
    return '#' + this.props.question.get('id')
  }

  getBestAnswer() {
    var bestAnswer = this.props.question.get('answers').sort( (a,b) => b.get('score') - a.get('score')).first()

    if( bestAnswer ) {
      return bestAnswer.get('title')
    } else {
      return ''
    }
  }

  showAnswerValidation() {
    if( this.state.submitted && this.state.answer == '' ) {
      return <div className='alert alert-warning control-padding'>
        Please describe your resolution</div>
    }
  }

  getAccordianId() {
    return 'answer_accordion_' + this.props.question.get('id')
  }

  render() {

    return <div className="panel panel-default">
      <div className="panel-heading">
        <h4 className="panel-title">
          <a data-toggle="collapse" data-parent="#question_accordion" href={this.getHref()}>
            Q. {this.props.question.get('title')}</a>
        </h4>
        <div>A. {this.getBestAnswer()}</div>
      </div>
      <div id={this.props.question.get('id')} className="panel-collapse collapse in">
        <div className="panel-body panel-padding">

          <div>
            <div>
              <form onSubmit={this.handleAnswerSubmit} className='panel-style form-group'>
                <div>
                  <div className='control-header-style'>
                    {this.showAnswerValidation()}
                    <input placeholder='Enter resolution description' tabIndex='1' type='text' className='form-control text-medium' value={this.state.answer} onChange={this.handleAnswerChange}/>
                    <a className='text-small popover-link' data-html='true' data-toggle="popover" data-content="You need to create at least two resolutions for your question.<br/>For example, 'Yes - I should buy the shoes' and 'No - I shouldn't buy the shoes'.<br/>Enter a resolution into the box above and click 'create resolution' to record the resolution. <br/>Do this for all possible outcomes you can see for your question.">what is this?</a>
                  </div>

                  <div className='control-header-style text-medium'>
                    <input className='btn btn-primary text-medium' tabIndex='3' type="submit" value='create resolution >>' />
                  </div>

                  <div className="panel-group control-header-style" id={this.getAccordianId()}>
                    {this.props.question.get('answers').map( answer =>
                      <AnswerContainer key={answer.get('id')} question={this.props.question} answer={answer} />
                    )}
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {

  }
}

const QuestionContainer = connect(
  mapStateToProps,
  actionCreators
)(Question)

export { Question, QuestionContainer }
