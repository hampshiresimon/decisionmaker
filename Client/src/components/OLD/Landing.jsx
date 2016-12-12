import React from 'react';
import {connect} from 'react-redux';
import {NewQuestionContainer} from './NewQuestion'
import {MyQuestionsContainer} from './MyQuestions'
var shallowCompare = require('react-addons-shallow-compare');
import * as actionCreators from '../core/actionCreator';


class Landing extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return <div>
      <div className='container-fluid'>
        <div className='col-md-10 col-md-offset-1 panelStyle'>

          <div className="btn-group">
            <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">Form Dropdown <span className="caret"></span></button>
            <form className="form-vertical dropdown-menu">
              <div className="form-group">
                <label for="inputEmail3" className="control-label">Email</label>
                <div className="">
                  <input type="email" className="form-control" id="inputEmail3" placeholder="Email"/>
                </div>
              </div>
              <div className="form-group">
                <label for="inputPassword3" className="control-label">Password</label>
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


            <NewQuestionContainer/>
            <MyQuestionsContainer account={this.props.account} questions={this.props.questions}/>
          </div>

        </div>
      </div>
    }
  }

  function mapStateToProps(state) {
    return {
      account : state.get('account'),
      questions : state.get('questions')
    }
  }

  const LandingContainer = connect(
    mapStateToProps,
    actionCreators
  )(Landing)

  export { Landing, LandingContainer }
