import React from 'react';
import ReactDOM from 'react-dom'
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import * as actionCreators from '../../core/actionCreator';
import {List, Map} from 'immutable';
import {WizardConsiderationContainer} from './WizardConsideration'



class WizardConsiderations extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      numberOfConsiderations : 4,
      considerations : List(),
      submitted : false
    }

    this.addConsideration = this.addConsideration.bind(this)
    this.considerationValueChanged = this.considerationValueChanged.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    this.props.mounted()
    //this.mainDiv.scrollTop = 0
    //window.scrollTo(0, 0)

    //consideration').stop().animate({ scrollTop: 0 }, 500);

    //alert(mainDiv)
    //alert($('#mainDiv').offset())
    //$(window).stop().animate({ scrollTop: $('#mainDiv').offset().top }, 500);

//$(window).scrollTop(0)
    //$(window).scrollTo(0,0) //stop().animate({ scrollTop: $('#mainDiv').offset().top }, 500);
    //scrollTop(ele.offset().top).scrollLeft(ele.offset().left);


  }

  handleSubmit(event) {
    this.setState( { submitted : true })
    event.preventDefault();

    if( this.state.considerations.size > 0 ) {
      this.props.nextClicked( this.state.considerations )
    }
  }

  considerationValueChanged(id, value, score) {

    var index = this.state.considerations.findIndex(a => {
      return a.get('id') === id
    })

    if( index >= 0 && (!value || value == '')) {
      // existing consideration which has been deleted
      let considerationState = this.state.considerations.filter((a) => a.get('id') !== id)
      this.setState( { considerations : considerationState })
    } else if( index == -1) {
      // no answer found - add one
      let considerationState = this.state.considerations.push( Map({ id : id, title : value, score : score }))
      this.setState( { considerations : considerationState })
    } else {
      // answer found - update
      let considerationState = this.state.considerations.filter((a) => a.get('id') !== id)
      let addedConsideration = considerationState.push( Map({ id : id, title : value, score : score }))
      this.setState( { considerations : addedConsideration })
    }
  }

  addConsideration() {

    let newNumberOfConsiderations = this.state.numberOfConsiderations + 1
    this.setState( { numberOfConsiderations : newNumberOfConsiderations })
  }

  showValidation() {
    if( this.state.submitted && this.state.considerations.size == 0 ) {
      return <div className='alert alert-warning control-padding'>
        Ensure you have entered a factor before continuing
      </div>
    }
  }

  render() {

    var considerations = [];
    for (var i=1; i <= this.state.numberOfConsiderations; i++) {
      considerations.push(<WizardConsiderationContainer key={i.toString()} considerationId={i.toString()} valueChanged={this.considerationValueChanged} />)
    }

    return <div className='control-header-style'>

      <div className='text-medium control-header-style'>
        For each outcome list the factors which will affect your decision.
      </div>
      <div className='text-small control-header-style'>
        As an example, for the outcome 'Yes - take the job in the city', the factors may be:
        <div className='text-small control-header-style'>
          <ol>
            <li className='text-small'>The city would be an exciting place to live</li>
            <li className='text-small'>The job pays very well</li>
            <li className='text-small'>I will miss my friends and family</li>
          </ol>
        </div>
        <div className='text-small control-header-style'>
          Use the sliders to apply weight to each factor. The further to the right, the more positive you consider the factor to be. The further to the left, the more negative.
        </div>
      </div>
      <div className='text-large control-header-style'>
        Outcome. '{this.props.answerTitle}'
      </div>
      <div className='control-header-style'>
        {this.showValidation()}
      </div>
      <form onSubmit={this.handleSubmit} className='panel-style form-group'>
        <div>
          {considerations}
        </div>
        <div onClick={this.addConsideration} className='cursor-hand control-header-style add-answer-container'>
          <span className='glyphicon glyphicon-plus-sign add-answer-glyph'/> <span className='add-answer-text'>add another factor</span>
        </div>
        <div className='control-header-style'>
          <input className='btn btn-primary text-medium answers-next-button' type='submit' value='next >>' />
        </div>
      </form>

    </div>
  }
}

WizardConsiderations.propTypes = {
  answerTitle : React.PropTypes.string,
  nextClicked : React.PropTypes.func.isRequired,
  mounted : React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {

  }
}

const WizardConsiderationsContainer = connect(
  mapStateToProps,
  actionCreators
)(WizardConsiderations)

export { WizardConsiderations, WizardConsiderationsContainer }
