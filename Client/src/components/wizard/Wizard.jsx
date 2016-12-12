import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import * as actionCreators from '../../core/actionCreator';
import {List, Map} from 'immutable';



class Wizard extends React.Component{
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }


  render() {

    return <div className='col-md-10 col-md-offset-1 panel-header-style'>
      <div className='text-large'>
        Q. {this.props.question.get('title')}
      </div>
      <div className='text-medium control-header-style'>
        You now need to list the possible outcomes for your question.
      </div>
      <div className='text-small control-header-style'>
        As an example, for the question 'Should I move jobs?', the options may be as follows:
        <div className='text-small control-header-style'>
          <ol>
            <li className='text-small'>No - stay where I am</li>
            <li className='text-small'>Yes - take the job in the city</li>
            <li className='text-small'>Yes - take the job closer to home</li>
          </ol>
        </div>
      </div>
      <div className='control-header-style'>
        
      </div>
    </div>
  }
}

Wizard.propTypes = {
  question : React.PropTypes.instanceOf(Map)
}

function mapStateToProps(state) {
  return {

  }
}

const WizardContainer = connect(
  mapStateToProps,
  actionCreators
)(Wizard)

export { Wizard, WizardContainer }
