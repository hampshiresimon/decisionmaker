import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import * as actionCreators from '../core/actionCreator';
import {Map} from 'immutable'
import * as Constants from '../core/constants'


class AccountCreate extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      firstName : '',
      lastName : '',
      username : '',
      password : '',
      email : '',
      marketing : true,
      submitted : false
    }

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleMarketingChange = this.handleMarketingChange.bind(this)
    this.handleAccountCreateSubmit = this.handleAccountCreateSubmit.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleFirstNameChange(event){
    this.setState({firstName: event.target.value})
  }

  handleLastNameChange(event){
    this.setState({lastName: event.target.value})
  }

  handleUsernameChange(event){
    this.setState({username: event.target.value})
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value})
  }

  handleEmailChange(event){
    this.setState({email: event.target.value})
  }

  handleMarketingChange(event){
    this.setState({marketing: event.target.checked})
  }

  handleAccountCreateSubmit(event) {
    this.setState( { submitted : true} )
    event.preventDefault();

    if( this.state.firstName != ''
        && this.state.lastName != ''
        && this.state.username != ''
        && this.state.password != ''
        && this.state.email != '' ) {

        this.props.createAccountAction( Map({
          firstName : this.state.firstName,
          lastName : this.state.lastName,
          username : this.state.username,
          password : this.state.password,
          email : this.state.email,
          marketing : this.state.marketing }))
    }
  }

  showFirstNameValidation() {
    if( this.state.submitted && this.state.firstName == '' ) {
      return <div className='text-danger'>Please provide a first name</div>
    }
  }

  showLastNameValidation() {
    if( this.state.submitted && this.state.lastName == '' ) {
      return <div className='text-danger'>Please provide a last name</div>
    }
  }

  showUsernameValidation() {
    if( this.state.submitted && this.state.username == '' ) {
      return <div className='text-danger'>Please provide a username</div>
    }
  }

  showPasswordValidation() {
    if( this.state.submitted && this.state.password == '' ) {
      return <div className='text-danger'>Please provide a password</div>
    }
  }

  showEmailValidation() {
    if( this.state.submitted && this.state.email == '' ) {
      return <div className='text-danger'>Please provide an email</div>
    }
  }

  getErrorMsg() {
    if( this.props.account.get('accountCreationStatus') == Constants.ACCOUNT_STATE_USERNAME_IN_USE) {
      return <div className='text-danger'>The username is in use</div>
    } else if( this.props.account.get('accountCreationStatus') == Constants.ACCOUNT_STATE_FAILED) {
      return <div className='text-danger'>An error occurred - please try again</div>
    }
  }


  render() {

    return <div>
      <form onSubmit={this.handleAccountCreateSubmit} className='panel-style form-group'>

        {this.getErrorMsg()}
        <div className='control-header-style'>
          {this.showFirstNameValidation()}
          <input type='text' tabIndex='1' className='form-control text-medium' placeholder='first name' value={this.state.firstName} onChange={this.handleFirstNameChange}/>
        </div>

        <div className='control-header-style'>
          {this.showLastNameValidation()}
          <input type='text' tabIndex='2' className='form-control text-medium' placeholder='last name' value={this.state.lastName} onChange={this.handleLastNameChange}/>
        </div>

        <div className='control-header-style'>
          {this.showUsernameValidation()}
          <input type='text' tabIndex='3' className='form-control text-medium' placeholder='username' value={this.state.username} onChange={this.handleUsernameChange}/>
        </div>

        <div className='control-header-style'>
          {this.showPasswordValidation()}
          <input type='password' tabIndex='4' className='form-control text-medium' placeholder='password' value={this.state.password} onChange={this.handlePasswordChange}/>
        </div>

        <div className='control-header-style'>
          {this.showEmailValidation()}
          <input type='text' tabIndex='5' className='form-control text-medium' placeholder='email' value={this.state.email} onChange={this.handleEmailChange}/>
        </div>
        <div>

        <div className='control-header-style'>
          <input id='marketingCheckbox' tabIndex='6' className='text-medium' type='checkbox' checked={this.state.marketing} onChange={this.handleMarketingChange}/>
          <label htmlFor='marketingCheckbox' className='text-medium control-left-margin'>hear from us via email?</label>
        </div>
        </div>
        <div className='control-header-style text-medium'>
          <input className='btn btn-primary text-medium' tabIndex='7' type="submit" value='create >>' />
        </div>
      </form>
    </div>

  }
}

function mapStateToProps(state) {
  return {

  }
}

const AccountCreateContainer = connect(
  mapStateToProps,
  actionCreators
)(AccountCreate);

export { AccountCreate, AccountCreateContainer }
