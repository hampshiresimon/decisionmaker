import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');


class Login extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    alert('A login was submitted: username : ' + this.state.username + ', password : ' + this.state.password);
    event.preventDefault();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
          return <div className="ol-md-8 col-md-offset-2">
            <form onSubmit={this.handleSubmit}>
                  <div>Username:</div>
                  <div><input type='text' value={this.state.username} onChange={this.handleUsernameChange}/></div>
                    <div>Password:</div>
                    <div><input type='text' value={this.state.password} onChange={this.handlePasswordChange}/></div>
                    <div>  <input type="submit" value="GO" /></div>
                    </form>
                </div>;
  }
}

export default Login
