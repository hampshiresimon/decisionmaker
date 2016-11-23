import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {List, Map} from 'immutable';
import * as actionCreators from '../core/actionCreator';
import uuid from 'uuid';
//import Slider from 'rc-slider';
//require('rc-slider/assets/index.css');
require('react-input-range/dist/react-input-range.css')
import InputRange from 'react-input-range';

class Considerations extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      considerationText : '',
      values : 0
    }

    this.removeConsideration = this.removeConsideration.bind(this)
    this.handleConsiderationChange = this.handleConsiderationChange.bind(this);
    this.handleConsiderationSubmit = this.handleConsiderationSubmit.bind(this);
    this.handleConsiderationValueChanged = this.handleConsiderationValueChanged.bind(this);
  }

  handleConsiderationChange(event) {
    this.setState({considerationText: event.target.value});
  }

  handleConsiderationSubmit(event) {
    event.preventDefault();
    var uid = uuid.v1()
    this.props.newConsiderationAction( Map({ title : this.state.considerationText, id : uid, score : 0 }), this.props.answer, this.props.question )
    this.state.considerationText = ''
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
      values: val,
    });
    /*
    alert('here')
    var consideration = this.props.answer.get('considerations').find( (c) => c.get('id') === id)
    var updatedConsideration = consideration.set('score', val)
    this.props.updateConsiderationAction(updatedConsideration, this.props.answer, this.props.question)
    */
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
            </h1>
            <div>



            <InputRange
                   maxValue={20}
                   minValue={0}
                   value={this.state.values}
                   onChange={this.handleConsiderationValueChanged}
                 />

            </div>
            <u data-id={c.get('id')} onClick={this.removeConsideration}>REMOVE</u>
          </div>
        )
      }
    </div>
  </div>
}


}

/*
//<CustomizedSlider startVal={c.get('score')} afterChange={ this.handleConsiderationValueChanged } />

class CustomizedSlider extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      value : this.props.startVal
    }

    alert('constructor = ' + this.props.startVal)

    this.onSliderChange = this.onSliderChange.bind(this)
    this.onAfterChange = this.onAfterChange.bind(this)
  }

  onSliderChange(value) {
    this.setState({
      value : value
    });
  }

  onAfterChange(value) {
      this.props.afterChange(value)
  }

  render() {
    return (
      <Slider value={this.state.value}
        onChange={this.onSliderChange} onAfterChange={this.onAfterChange}
      />
    );
  }
}
*/

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
