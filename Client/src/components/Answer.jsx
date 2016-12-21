import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../core/actionCreator';
import uuid from 'uuid';
import {List, Map} from 'immutable';
import {ConsiderationContainer} from './Consideration'


class Answer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      consideration: '',
      submitted : false,
      showAddConsideration : false
    }

    this.handleConsiderationChange = this.handleConsiderationChange.bind(this)
    this.handleConsiderationSubmit = this.handleConsiderationSubmit.bind(this)
    this.addConsideration = this.addConsideration.bind(this)
    this.closeAddConsideration = this.closeAddConsideration.bind(this)
  }

  componentDidMount() {
    // enure new popovers work
    $('[data-toggle="popover"]').popover();

    if( this.props.answer.get('considerations').size == 0 ) {
      this.setState( { showAddConsideration : true } )
    }
  }

  handleConsiderationChange(event) {
    this.setState({consideration: event.target.value});
  }

  addConsideration() {
    this.setState( { showAddConsideration : true } )
  }

  closeAddConsideration() {
    this.setState( { showAddConsideration : false, submitted : false, consideration : ''} )
  }

  showAddConsideration() {
    if( !this.state.showAddConsideration ) {
      return <div onClick={this.addConsideration} className='cursor-hand control-header-style'>
        <div className='glyphicon glyphicon-plus-sign landing-add-outcome-glyph'/>
        <div className='landing-add-outcome-text'>add factor</div>
      </div>
    } else {
      return <div className='control-header-style'>
        <form className='form-group' onSubmit={this.handleConsiderationSubmit}>
          <div className='control-header-style'>
            {this.showConsiderationValidation()}
            <div className="input-group">
              <input placeholder='Enter factor description' tabIndex='1' type='text' className='form-control text-medium' value={this.state.consideration} onChange={this.handleConsiderationChange}/>
              <span className="input-group-addon glyphicon glyphicon-remove" id="outcome-addon" onClick={this.closeAddConsideration}></span>
            </div>
          </div>
          <div className='control-header-style text-medium'>
            <input className='btn btn-primary text-medium' tabIndex='3' type="submit" value='add factor >>' />
          </div>
        </form>
      </div>
    }
  }


  handleConsiderationSubmit(event) {

    this.setState( { submitted : true} )
    event.preventDefault();

    if( this.state.consideration != '') {
      var uid = uuid.v1()
      this.props.newConsiderationAction( Map({ title : this.state.consideration, id : uid, score : 0 }), this.props.answer, this.props.question )

      this.setState( { submitted : false, consideration : '', showAddConsideration : false } )
    }
  }

  showConsiderationValidation() {
    if( this.state.submitted && this.state.consideration == '' ) {
      return <div className='text-warning text-small'>
        Please describe your new factor</div>
    }
  }

  getHref() {
    return '#panel_' + this.props.answer.get('id')
  }

  getPanelBodyId() {
    return 'panel_' + this.props.answer.get('id')
  }

  getAccordianId() {
    return '#answer_accordion_' + this.props.question.get('id')
  }

  getConsiderationAccordianId() {
    return '#consideration_accordion_' + this.props.answer.get('id')
  }

  getBestOutcomeText() {
    if( this.props.isBest ) {
      return <div><span className='glyphicon glyphicon-thumbs-up'/> BEST OUTCOME</div>
    }
  }

  getPanelCss() {
    if( this.props.isBest ) {
      return 'panel panel-success control-header-style'
    } else {
      return 'panel panel-info control-header-style'
    }
  }

  render() {

    return <div className={this.getPanelCss()}>
      <div className="panel-heading">

        <div className='question-header-container answer-header-container'>

          <div className='question-header-title'>
            {this.getBestOutcomeText()}
            <a className='panel-toggle' data-toggle="collapse" data-parent={this.getAccordianId()} href={this.getHref()}>
              <div className='question-header-open-close'>
                <span className='glyphicon glyphicon-circle-arrow-right question-header-closed-icon'></span>
                <span className='glyphicon glyphicon-circle-arrow-down question-header-open-icon hide'></span>
              </div>
              <span className='text-medium'>{this.props.answer.get('title')}</span>
            </a>
            <div className='text-medium'>Score: {this.props.answer.get('score')}</div>
          </div>
        </div>
      </div>
      <div id={this.getPanelBodyId()} className="panel-collapse collapse">
        <div className="panel-body panel-padding">

          <div>
            <div>
              <div className='panel-style form-group'>
                <div>
                  {this.props.answer.get('considerations').map( consideration =>
                    <ConsiderationContainer key={consideration.get('id')} consideration={consideration} question={this.props.question} answer={this.props.answer} />
                  )}
                </div>
                {this.showAddConsideration()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}


/*
<div className='control-header-style'>
{this.showConsiderationValidation()}
<input placeholder='Enter consequence description' tabIndex='1' type='text' className='form-control text-medium' value={this.state.consideration} onChange={this.handleConsiderationChange}/>
<a className='text-small popover-link' data-html='true' data-toggle="popover" data-content="For each potential resolution you need to create considerations upon which the preferred resolution will be selected.<br/>For example, a consideration may be 'Because the shoes are in the sale'.<br/>After the consideration is created you should use the slider to give positive or negative weight to the new consideration.<br/>The weight you give to a consideration will be used to determine the best resolution to your quesstion.<br/>The resolution determined by your considerations will be displayed under the question heading above.">what is this?</a>
</div>

<div className='control-header-style text-medium'>
<input className='btn btn-primary text-medium' tabIndex='3' type="button" onClick={this.handleConsiderationSubmit}  value='create consequence >>' />
</div>
*/

Answer.propTypes = {
  isBest : React.PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {

  }
}

const AnswerContainer = connect(
  mapStateToProps,
  actionCreators
)(Answer)

export { Answer, AnswerContainer }
