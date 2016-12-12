import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import * as actionCreators from '../core/actionCreator';
import {Map} from 'immutable'
import * as Constants from '../core/constants'


class AccountLogin extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      username : '',
      password : '',
      submitted : false
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleUsernameChange(event){
    this.setState({username: event.target.value})
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value})
  }

  handleLoginSubmit(event) {
    this.setState({submitted : true})
    event.preventDefault()

    if( this.state.username != '' && this.state.password != '') {
      this.props.loginAction( Map({
        username : this.state.username,
        password : this.state.password
      }))
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

  getErrorMsg() {
    if( this.props.account.get('loginStatus') == Constants.LOGIN_STATE_FAILED) {
      return <div className='text-danger'>The supplied details were incorrect</div>
    }
  }


  render() {

    return <div>
      <form onSubmit={this.handleLoginSubmit} className='panel-style form-group'>
        {this.getErrorMsg()}
        <div className='control-header-style'>
          {this.showUsernameValidation()}
          <div className="input-group">
            <span className="input-group-addon glyphicon glyphicon-user" id="username-addon"></span>
            <input placeholder='username' tabIndex='1' type='text' aria-describedby="username-addon" className='form-control text-medium' value={this.state.username} onChange={this.handleUsernameChange}/>
          </div>
        </div>



        <div className='control-header-style'>
          {this.showPasswordValidation()}
          <div className="input-group">
            <span className="input-group-addon glyphicon glyphicon-lock" id="password-addon"></span>
            <input placeholder='password' tabIndex='2' type='password' aria-describedby="password-addon" className='form-control text-medium' value={this.state.password} onChange={this.handlePasswordChange}/>
          </div>
        </div>
        <div className='control-header-style text-medium'>
          <input className='btn btn-primary text-medium' tabIndex='3' type="submit" value='login >>' />
        </div>
      </form>
    </div>

  }
}

function mapStateToProps(state) {
  return {
    //answers : state.get('answers')
    //pair: state.getIn(['vote', 'pair']),
    //hasVoted: state.get('hasVoted'),
    //winner: state.get('winner')
  };
}

const AccountLoginContainer = connect(
  mapStateToProps,
  actionCreators
)(AccountLogin);

export { AccountLogin, AccountLoginContainer }
