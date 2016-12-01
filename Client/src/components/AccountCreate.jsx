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
      marketing : true
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
    event.preventDefault();
    this.props.createAccountAction( Map({
      firstName : this.state.firstName,
      lastName : this.state.lastName,
      username : this.state.username,
      password : this.state.password,
      email : this.state.email }))

    //var uid = uuid.v1()
    //this.props.newQuestionAction( Map({ title : this.state.questionText, id : uid }), this.props.question)
    //browserHistory.push('/question/' + uid);
  }

  getErrorMsg()
  {
    let msg = null
    if( this.props.account.get('accountCreationStatus') == Constants.ACCOUNT_STATE_USERNAME_IN_USE) {
      msg = 'The username is in use - please select another'
    } else if( this.props.account.get('accountCreationStatus') == Constants.ACCOUNT_STATE_FAILED) {
      msg = 'There was a problem creating your account - please try again'
    }

    if(msg)
    {
      return <div><b>{msg}</b></div>
    }
  }


  render() {

    return <div>{this.getErrorMsg()}<div>
      <form onSubmit={this.handleAccountCreateSubmit}>
        <div>
          first name
        </div>
        <div>
          <input type='text' value={this.state.firstName} onChange={this.handleFirstNameChange}/>
        </div>
        <div>
          last name
        </div>
        <div>
          <input type='text' value={this.state.lastName} onChange={this.handleLastNameChange}/>
        </div>
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
          email
        </div>
        <div>
          <input type='text' value={this.state.email} onChange={this.handleEmailChange}/>
        </div>
        <div>
          <label>
            <input type='checkbox' checked={this.state.marketing} onChange={this.handleMarketingChange}/>
            marketing?
          </label>
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

const AccountCreateContainer = connect(
  mapStateToProps,
  actionCreators
)(AccountCreate);

export { AccountCreate, AccountCreateContainer }
