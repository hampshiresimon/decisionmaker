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
      submitted : false
    }

    this.handleConsiderationChange = this.handleConsiderationChange.bind(this);
    this.handleConsiderationSubmit = this.handleConsiderationSubmit.bind(this);
  }

  componentDidMount() {
    // enure new popovers work
    $('[data-toggle="popover"]').popover();
  }

  handleConsiderationChange(event) {
    this.setState({consideration: event.target.value});
  }

  handleConsiderationSubmit(event) {

    this.setState( { submitted : true} )
    event.preventDefault();

    if( this.state.consideration != '') {
      var uid = uuid.v1()
      this.props.newConsiderationAction( Map({ title : this.state.consideration, id : uid, score : 0 }), this.props.answer, this.props.question )

      this.setState( { submitted : false, consideration : '' } )
    }
  }

  showConsiderationValidation() {
    if( this.state.submitted && this.state.consideration == '' ) {
      return <div className='alert alert-warning control-padding'>
        Please describe your consequence</div>
    }
  }

  getHref() {
    return '#' + this.props.answer.get('id')
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

  render() {

    return <div className="panel panel-default control-header-style">
      <div className="panel-heading">
        {this.getBestOutcomeText()}
        <div className='question-header-container'>
          <div className='question-header-title'>
            <a className='panel-toggle' data-toggle="collapse" data-parent={this.getAccordianId()} href={this.getHref()}>
              <div className='question-header-open-close'>
                <span className='glyphicon glyphicon-circle-arrow-right question-header-closed-icon'></span>
                <span className='glyphicon glyphicon-circle-arrow-down question-header-open-icon hide'></span>
              </div>
              <span className='text-medium'>Outcome. {this.props.answer.get('title')}</span>
            </a>
          </div>
        </div>
      </div>
      <div id={this.props.answer.get('id')} className="panel-collapse collapse">
        <div className="panel-body panel-padding">

          <div>
            <div>
              <div className='panel-style form-group'>
                <div>
                  {this.props.answer.get('considerations').map( consideration =>
                    <ConsiderationContainer key={consideration.get('id')} consideration={consideration} question={this.props.question} answer={this.props.answer} />
                  )}
                </div>
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
