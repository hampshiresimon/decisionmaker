import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import * as actionCreators from '../core/actionCreator';



class AccountDisplay extends React.Component {
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
      <div>
        <div className='text-large'>
          Hallo {this.props.account.get('user').get('firstName')} {this.props.account.get('user').get('lastName')}!
        </div>
        <div className='text-medium'>
          All changes you now make below will now be automatically saved
        </div>
      </div>
    </div>
  }
}


function mapStateToProps(state) {
  return {

  }
}

const AccountDisplayContainer = connect(
  mapStateToProps,
  actionCreators
)(AccountDisplay)

export { AccountDisplay, AccountDisplayContainer }
