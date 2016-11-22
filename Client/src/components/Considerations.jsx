import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {List, Map} from 'immutable';
import * as actionCreators from '../core/actionCreator';


class Considerations extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      considerationText : ''
    }

    this.newConsideration = this.newConsideration.bind(this)
    this.removeConsideration = this.removeConsideration.bind(this)
    this.handleConsiderationChange = this.handleConsiderationChange.bind(this);
    this.handleConsiderationSubmit = this.handleConsiderationSubmit.bind(this);
  }

  handleConsiderationChange(event) {
    this.setState({considerationText: event.target.value});
  }

  handleConsiderationSubmit(event) {
    //event.preventDefault();
    //this.props.newQuestionAction(this.state.questionText)
    //browserHistory.push('/some/path/123');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  newConsideration(event) {
    event.preventDefault()
    //this.props.newAnswer()
  }

  removeConsideration(event) {
    event.preventDefault()
    //this.props.removeAnswerAction(event.currentTarget.dataset.id, this.props.question)
  }

  render() {

    /* order by highest score first */
    var considerations = this.props.answer.get('considerations')  //.sort( (a,b) => b.get('score') - a.get('score'))

    return <div>
      <div>
        <form onSubmit={this.handleConsiderationSubmit}>

              <div>
                <input type='text' value={this.state.considerationText} onChange={this.handleConsiderationChange}/>
                <input type="submit" value="ADD" />
              </div>
            </form>
      </div>
      <div>
        {considerations.map(c=>
          <div>
            <h1 key={c.get('id')}>
              <u>{c.get('title')}</u>


              <u data-id={c.get('id')} onClick={this.removeConsideration}>REMOVE</u>
              </h1>

          </div>
          )
        }
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

const ConsiderationsContainer = connect(
  mapStateToProps,
  actionCreators
)(Considerations);

export { Considerations, ConsiderationsContainer }
