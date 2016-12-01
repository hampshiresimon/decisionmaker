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
    event.preventDefault()
    this.props.loginAction( Map({
      username : this.state.username,
      password : this.state.password
    }))
  }

  getErrorMsg()
  {
    let msg = null
    if( this.props.account.get('loginStatus') == Constants.LOGIN_STATE_FAILED) {
      msg = 'The supplied details were incorrect - please try again'
    }

    if(msg)
    {
      return <div><b>{msg}</b></div>
    }
  }


  render() {

    return <div>{this.getErrorMsg()}<div>
      <form onSubmit={this.handleLoginSubmit}>
        <div>
          username
        </div>
        <div>
          <input type='text' value={this.state.username} onChange={this.handleUsernameChange}/>
        </div>
        <div>
          password
        </div>
        <div>
          <input type='text' value={this.state.password} onChange={this.handlePasswordChange}/>
        </div>
        <div>
          <input type="submit" value="GO" />
        </div>
      </form>
    </div>
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
