import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import {List, Map} from 'immutable';
import InputRange from 'react-input-range';
import * as actionCreators from '../core/actionCreator';
import {hslToRgb, numberToColorHsl} from '../core/helpers/colours';

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
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    this.updateSliderColour(0)
  }

  removeConsideration(event) {
    event.preventDefault()
    this.props.removeConsiderationAction(event.currentTarget.dataset.id, this.props.answer, this.props.question)
  }

  handleConsiderationValueChanged(id, val) {

    this.updateSliderColour(val)

    var consideration = this.props.consideration
    var updatedConsideration = consideration.set('score', val)
    this.props.updateConsiderationAction(updatedConsideration, this.props.answer, this.props.question)

    this.setState({ value : val })
  }

  updateSliderColour(value) {

    // the colour values go from -50 to 50 so add 50 to make it a 0 - 100 scale
    let colourValue = value + 50

    $(this.inputRangeDiv).find('.InputRange-slider').css('background-color', numberToColorHsl(colourValue))
    $(this.inputRangeDiv).find('.InputRange-track--active').css('background-color', numberToColorHsl(colourValue))
  }

  render() {

    /* order by highest score first */
    var consideration = this.props.consideration

    return   <div className='control-header-style'>
        <div>
          {consideration.get('title')}
        </div>

        <div ref={(input) => { this.inputRangeDiv = input; }}>
          <div className='consideration-icon-container'>
            <div className='consideration-icon-left'>
              <span className='glyphicon glyphicon-thumbs-down'/> <span className='text-small'>bad</span>
            </div>
            <div className='consideration-icon-right'>
              <span className='text-small'>good</span> <span className='glyphicon glyphicon-thumbs-up'/>
            </div>
          </div>
          <InputRange
            maxValue={50}
            minValue={-50}
            value={this.state.value}
            onChange={this.handleConsiderationValueChanged}
            />
        </div>
      </div>

    /*<div className='panel panel-default control-header-style panel-padding'>
      <div className='panel-body'>
        <div>
          {consideration.get('title')}
        </div>
        <div ref={(input) => { this.inputRangeDiv = input; }}>
          <InputRange
            maxValue={50}
            minValue={-50}
            value={this.state.value}
            onChange={this.handleConsiderationValueChanged}
            />
        </div>
      </div>
    </div>
    */
  }
}


function mapStateToProps(state) {
  return {

  }
}

const ConsiderationContainer = connect(
  mapStateToProps,
  actionCreators
)(Consideration);

export { Consideration, ConsiderationContainer }
