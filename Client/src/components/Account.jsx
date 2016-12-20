import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import * as actionCreators from '../core/actionCreator';
import {AccountLoginContainer} from './AccountLogin'
import {AccountCreateContainer} from './AccountCreate'



class Account extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      showLogin : true,
      showRegister : false
    }

    this.showLogin = this.showLogin.bind(this)
    this.showRegister = this.showRegister.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  showLogin(event) {
    this.setState( { showLogin : true, showRegister : false })
  }

  showRegister(event) {
    this.setState( { showLogin : false, showRegister : true })
  }

  getVisibleComponent() {
    if( this.state.showLogin ) {
      return <AccountLoginContainer account={this.props.account}/>
    } else {
      return <AccountCreateContainer account={this.props.account}/>
    }
  }

  render() {

    return <div className='panel-header-style'>
      <div className="btn-group">
        <button type="button" className="btn btn-primary dropdown-toggle text-medium" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">My Account <span className="caret"></span></button>
        <div className="form-vertical dropdown-menu keep_open no-margin">

          <span id="radioButtons" className="btn-group account-form" data-toggle="buttons">
            <label className="btn btn-primary active account-form-tab text-medium" onClick={this.showLogin}>
              <input type="radio" name="options" id="option1"/>Login
              </label>
              <label className="btn btn-primary account-form-tab text-medium"  onClick={this.showRegister}>
                <input type="radio" name="options" id="option2" checked=""/>Register
                </label>
              </span>
              <div className='account-form-footer'>
                {this.getVisibleComponent()}
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

    const AccountContainer = connect(
      mapStateToProps,
      actionCreators
    )(Account)

    export { Account, AccountContainer }
