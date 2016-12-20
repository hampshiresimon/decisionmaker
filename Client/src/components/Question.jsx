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

    // hide / show panel open & cllapse buttons
    $('.panel').on('shown.bs.collapse', function (e) {
      $(e.target).closest('.panel').find('.question-header-closed-icon').first().addClass('hide')
      $(e.target).closest('.panel').find('.question-header-open-icon').first().removeClass('hide')
    })

    $('.panel').on('hidden.bs.collapse', function (e) {
      $(e.target).closest('.panel').find('.question-header-closed-icon').first().removeClass('hide')
      $(e.target).closest('.panel').find('.question-header-open-icon').first().addClass('hide')
    })
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

    var bestAnswer = this.props.question.get('answers').sort( (a,b) => b.get('score') - a.get('score')).first()
    var otherAnswers = this.props.question.get('answers').filter(a => a.get('id') != bestAnswer.get('id')).sort( (a,b) => b.get('score') - a.get('score'))


    return <div className="panel panel-default">
      <div className="panel-heading">
        <div className='question-header-container'>
          <div className='question-header-title'>
            <a className='panel-toggle' data-toggle="collapse" data-parent="#question_accordion" href={this.getHref()}>
              <div className='question-header-open-close'>
                <span className='glyphicon glyphicon-circle-arrow-right question-header-closed-icon'></span>
                <span className='glyphicon glyphicon-circle-arrow-down question-header-open-icon hide'></span>
              </div>
              <span className='text-medium'>Question. {this.props.question.get('title')}</span>
            </a>
          </div>
          <div className='question-header-answer'>
            Best Outcome. {this.getBestAnswer()}
          </div>
        </div>
      </div>
      <div id={this.props.question.get('id')} className="accordian-body collapse">
        <div className="panel-body panel-padding">

          <div>
            <div>
              <form onSubmit={this.handleAnswerSubmit} className='panel-style form-group'>
                <div>
                  <div className='text-medium'>
                    Outcomes
                  </div>


                    <AnswerContainer isBest={true} key={bestAnswer.get('id')} question={this.props.question} answer={bestAnswer} />





                  <div className="panel-group control-header-style" id={this.getAccordianId()}>
                    {otherAnswers.map( answer =>
                      <AnswerContainer isBest={false} key={answer.get('id')} question={this.props.question} answer={answer} />
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


/*
<div className='control-header-style'>
  {this.showAnswerValidation()}
  <input placeholder='Enter resolution description' tabIndex='1' type='text' className='form-control text-medium' value={this.state.answer} onChange={this.handleAnswerChange}/>
  <a className='text-small popover-link' data-html='true' data-toggle="popover" data-content="You need to create at least two resolutions for your question.<br/>For example, 'Yes - I should buy the shoes' and 'No - I shouldn't buy the shoes'.<br/>Enter a resolution into the box above and click 'create resolution' to record the resolution. <br/>Do this for all possible outcomes you can see for your question.">what is this?</a>
</div>

<div className='control-header-style text-medium'>
  <input className='btn btn-primary text-medium' tabIndex='3' type="submit" value='create resolution >>' />
</div>
*/

function mapStateToProps(state) {
  return {

  }
}

const QuestionContainer = connect(
  mapStateToProps,
  actionCreators
)(Question)

export { Question, QuestionContainer }
