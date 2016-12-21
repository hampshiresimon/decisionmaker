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
      submitted : false,
      showAddAnswer : false
    }

    this.handleAnswerChange = this.handleAnswerChange.bind(this)
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this)
    this.addAnswer = this.addAnswer.bind(this)
    this.closeAddAnswer = this.closeAddAnswer.bind(this)
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

      this.setState( { submitted : false, answer : '', showAddAnswer : false } )
    }
  }

  addAnswer() {
    this.setState( { showAddAnswer : true } )
  }

  closeAddAnswer() {
    this.setState( { showAddAnswer : false, submitted : false, answer : '' })
  }

  showAddAnswer() {
    if( !this.state.showAddAnswer ) {
      return <div onClick={this.addAnswer} className='cursor-hand control-header-style'>
        <div className='glyphicon glyphicon-plus-sign landing-add-outcome-glyph'/>
        <div className='landing-add-outcome-text'>add outcome</div>
      </div>
    } else {
      return <form className='form-group' onSubmit={this.handleAnswerSubmit}>
        <div className='control-header-style'>
          {this.showAnswerValidation()}
          <div className="input-group">
            <input placeholder='Enter outcome description' aria-describedby='outcome-addon' tabIndex='1' type='text' className='form-control text-medium' value={this.state.answer} onChange={this.handleAnswerChange}/>
            <span className="input-group-addon glyphicon glyphicon-remove" id="outcome-addon" onClick={this.closeAddAnswer}></span>
          </div>
        </div>
        <div className='control-header-style text-medium'>
          <input className='btn btn-primary text-medium' tabIndex='3' type="submit" value='add outcome >>' />
        </div>
      </form>
    }
  }


  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  getHref() {
    return '#question_panel_' + this.props.question.get('id')
  }

  getPanelBodyId() {
    return 'question_panel_' + this.props.question.get('id')
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
      return <div className='text-warning text-small'>
        Please describe your new outcome</div>
    }
  }

  getAccordianId() {
    return 'answer_accordion_' + this.props.question.get('id')
  }

  render() {

    var bestAnswer = this.props.question.get('answers').sort( (a,b) => b.get('score') - a.get('score')).first()

    return <div className="panel panel-primary">
      <div className="panel-heading">
        <div className='question-header-container'>
          <div className='question-header-title'>
            <a className='panel-toggle' data-toggle="collapse" data-parent="#question_accordion" href={this.getHref()}>
              <div className='question-header-open-close'>
                <span className='glyphicon glyphicon-circle-arrow-right question-header-closed-icon question-header-text'></span>
                <span className='glyphicon glyphicon-circle-arrow-down question-header-open-icon hide question-header-text'></span>
              </div>
              <span className='text-medium question-header-text'>{this.props.question.get('title')}</span>
            </a>
          </div>
        </div>
      </div>
      <div id={this.getPanelBodyId()} className="accordian-body collapse">
        <div className="panel-body panel-padding">
          <div>
            <div>
              <div>
                <div className="panel-group control-header-style" id={this.getAccordianId()}>
                  {this.props.question.get('answers').map( answer =>
                    <AnswerContainer isBest={answer.get('id') == bestAnswer.get('id')} key={answer.get('id')} question={this.props.question} answer={answer} />
                  )}
                </div>
                {this.showAddAnswer()}
              </div>
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
