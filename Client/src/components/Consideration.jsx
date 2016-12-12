import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import {List, Map} from 'immutable';
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
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    this.updateSliderColour()
  }

  removeConsideration(event) {
    event.preventDefault()
    this.props.removeConsiderationAction(event.currentTarget.dataset.id, this.props.answer, this.props.question)
  }

  handleConsiderationValueChanged(id, val) {
    this.setState({
      value : val,
    });

    this.updateSliderColour()

    var consideration = this.props.consideration
    var updatedConsideration = consideration.set('score', val)
    this.props.updateConsiderationAction(updatedConsideration, this.props.answer, this.props.question)
  }

  updateSliderColour() {

    // the colour values go from -50 to 50 so add 50 to make it a 0 - 100 scale
    let colourValue = this.state.value + 50

    $(this.inputRangeDiv).find('.InputRange-slider').css('background-color', this.numberToColorHsl(colourValue))
    $(this.inputRangeDiv).find('.InputRange-track--active').css('background-color', this.numberToColorHsl(colourValue))
  }


  hslToRgb(h, s, l) {
    var r, g, b;

    if(s == 0){
      r = g = b = l; // achromatic
    }else{
      function hue2rgb(p, q, t){
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
  }

  // convert a number to a color using hsl
  numberToColorHsl(i) {
    // as the function expects a value between 0 and 1, and red = 0° and green = 120°
    // we convert the input to the appropriate hue value
    var hue = i * 1.2 / 360;
    // we convert hsl to rgb (saturation 100%, lightness 50%)
    var rgb = this.hslToRgb(hue, 1, .5);
    // we format to css value and return
    return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
  }

  render() {

    /* order by highest score first */
    var consideration = this.props.consideration

    return <div className='panel panel-default control-header-style panel-padding'>
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
