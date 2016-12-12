import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Map, List} from 'immutable';
import * as actionCreators from '../core/actionCreator';
import {AnswersContainer} from './Answers'
import {NewAnswerContainer} from './NewAnswer'
import {AccountContainer} from './Account'
import * as Constants from '../core/constants'
import {Link} from 'react-router';


class Question extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      showAccount : false
    }

    this.saveQuestion = this.saveQuestion.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //this.setState({questionText: event.target.value});
  }

  handleSubmit(event) {
    //event.preventDefault();
    //this.props.newQuestionAction(this.state.questionText)
    //browserHistory.push('/some/path/123');
  }

  getQuestion()
  {
    return this.props.questions.find(q => {
          return q.get('id') === this.props.params.questionId })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  getBestAnswer()
  {
    var bestAnswer = this.getQuestion().get('answers').sort( (a,b) => b.get('score') - a.get('score')).first()

    if( bestAnswer )
    {
      return <div>BEST ANSWER - {bestAnswer.get('title')}</div>
    }
  }

  saveQuestion()
  {
    this.setState( { showAccount : true} )
  }


  getAccountLink()
  {
    if( !this.state.showAccount && !(this.props.account.get('loginStatus') == Constants.LOGIN_STATE_LOGGED_IN ))
    {
      return <div onClick={this.saveQuestion}>SAVE THIS QUESTION</div>
    }
  }


  getAccountLink()
  {
    if(!(this.props.account.get('loginStatus') == Constants.LOGIN_STATE_LOGGED_IN ))
    {
      return  <div className='container-fluid'>
          <div className='col-md-10 col-md-offset-1 panelStyle'>

            <div className="btn-group">
            					  <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">Form Dropdown <span className="caret"></span></button>
            						<form className="form-vertical dropdown-menu">
            							<div className="form-group">
            								<label className="control-label">Email</label>
            								<div className="">
            									<input type="email" className="form-control" id="inputEmail3" placeholder="Email"/>
            								</div>
            							</div>
            							<div className="form-group">
            								<label className="control-label">Password</label>
            								<div className="">
            									<input type="password" className="form-control" id="inputPassword3" placeholder="Password"/>
            								</div>
            							</div>
            							<div className="form-group">
            								<div className="">
            									<div className="checkbox">
            										<label>
            											<input type="checkbox"/> Remember me
            										</label>
            									</div>
            								</div>
            							</div>
            							<div className="form-group">
            								<div className="">
            									<button type="submit" className="btn btn-default">Sign in</button>
            								</div>
            							</div>
            						</form>
            					</div>



          </div>

        </div>
    }
  }

  getWelcomePanel()
  {
    if( this.props.account.get('loginStatus') == Constants.LOGIN_STATE_LOGGED_IN )
    {
      return <div>WELCOME {this.props.account.get('user').get('firstName')} {this.props.account.get('user').get('lastName')}</div>
    }
  }

  render() {
    var question = this.getQuestion()




    return <div className="container-fluid">
          <div><Link to='/'>MORE QUESTIONS</Link></div>
              <div>{question.get('title')}</div>
              { this.getAccountLink()}


            </div>
    }
}

function mapStateToProps(state) {
  return {
    account : state.get('account'),
    questions : state.get('questions')
    //pair: state.getIn(['vote', 'pair']),
    //hasVoted: state.get('hasVoted'),
    //winner: state.get('winner')
  }
}

const QuestionContainer = connect(
  mapStateToProps,
  actionCreators
)(Question)

export { Question, QuestionContainer }
