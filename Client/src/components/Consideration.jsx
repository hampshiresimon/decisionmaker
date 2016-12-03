import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import {List, Map} from 'immutable';
require('react-input-range/dist/react-input-range.css')
import InputRange from 'react-input-range';
import * as actionCreators from '../core/actionCreator';

class Consideration extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      value : this.props.consideration.get('score')
    }

    this.removeConsideration = this.removeConsideration.bind(this)
    this.handleConsiderationValueChanged = this.handleConsiderationValueChanged.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true// shallowCompare(this, nextProps, nextState);
  }

  removeConsideration(event) {
    event.preventDefault()
    this.props.removeConsiderationAction(event.currentTarget.dataset.id, this.props.answer, this.props.question)
  }

  handleConsiderationValueChanged(id, val)
  {
    this.setState({
      value : val,
    });

    var consideration = this.props.consideration
    var updatedConsideration = consideration.set('score', val)
    this.props.updateConsiderationAction(updatedConsideration, this.props.answer, this.props.question)
  }


  render() {

    /* order by highest score first */
    var consideration = this.props.consideration

    return <div>
      <u>{consideration.get('title')}</u>
      <div>
        <InputRange
          maxValue={20}
          minValue={-20}
          value={this.state.value}
          onChange={this.handleConsiderationValueChanged}
          />
      </div>
      <u data-id={consideration.get('id')} onClick={this.removeConsideration}>REMOVE</u>
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

const ConsiderationContainer = connect(
  mapStateToProps,
  actionCreators
)(Consideration);

export { Consideration, ConsiderationContainer }
