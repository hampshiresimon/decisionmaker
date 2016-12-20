import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import * as actionCreators from '../../core/actionCreator';
import {List, Map} from 'immutable';



class WizardSummary extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }


  render() {

    var bestAnswer = this.props.question.get('answers').sort( (a,b) => b.get('score') - a.get('score')).first()
    var otherAnswers = this.props.question.get('answers').filter(a => a.get('id') != bestAnswer.get('id')).sort( (a,b) => b.get('score') - a.get('score'))

    return <div className='control-header-style'>
      <div className='text-medium'>
        <div className='alert alert-success'>
          <div>
            <span className='glyphicon glyphicon-thumbs-up'/> BEST OUTCOME
          </div>
          <div className='text-large'>
            {bestAnswer.get('title')}
          </div>
          <div className='text-large'>
            Score: {bestAnswer.get('score')}
          </div>
        </div>
        <div className='text-medium'>
          Next best options, from best to worst:
        </div>
        {otherAnswers.map( answer =>
          <div className='control-header-style alert alert-info' key={answer.get('id')}>
            <div>
              {answer.get('title')}
            </div>
            <div>
              Score: {answer.get('score')}
            </div>
          </div>

        )}
      </div>
      <div className='text-medium'>
        To save this question for future reference or adjustment, please log-in or create an account in the 'My Account' section at the top of the page.
      </div>
      <div className>
        <input className='btn btn-primary text-medium answers-next-button' onClick={this.props.finish} type='button' value='finish >>' />
      </div>
    </div>
  }
}

WizardSummary.propTypes = {
  question : React.PropTypes.instanceOf(Map),
  finish : React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
  }
}

const WizardSummaryContainer = connect(
  mapStateToProps,
  actionCreators
)(WizardSummary)

export { WizardSummary, WizardSummaryContainer }
