import React from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import {connect} from 'react-redux';
import * as actionCreators from '../../core/actionCreator';
import {List, Map} from 'immutable';
import {hslToRgb, numberToColorHsl} from '../../core/helpers/colours';
import InputRange from 'react-input-range';



class WizardConsideration extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      considerationText : '',
      sliderValue : 0
    }

    this.handleConsiderationChange = this.handleConsiderationChange.bind(this)
    this.handleConsiderationValueChanged = this.handleConsiderationValueChanged.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    this.updateSliderColour()
  }

  handleConsiderationChange(event) {
    this.setState({considerationText: event.target.value});
    this.props.valueChanged(this.props.considerationId, event.target.value, this.state.sliderValue)
  }

  getPlaceholder() {
    return 'Factor ' + this.props.considerationId
  }

  handleConsiderationValueChanged(id, val) {
    this.setState({
      sliderValue : val,
    });

    this.updateSliderColour()

    this.props.valueChanged(this.props.considerationId, this.state.considerationText, val)
  }

  updateSliderColour() {

    // the colour values go from -50 to 50 so add 50 to make it a 0 - 100 scale
    let colourValue = this.state.sliderValue + 50

    $(this.inputRangeDiv).find('.InputRange-slider').css('background-color', numberToColorHsl(colourValue))
    $(this.inputRangeDiv).find('.InputRange-track--active').css('background-color', numberToColorHsl(colourValue))
  }

  render() {

    return <div className='consideration-header-style'>
      <div>
        <input placeholder={this.getPlaceholder()} type='text' className='form-control text-medium control-header-style' value={this.state.considerationText} onChange={this.handleConsiderationChange}/>
        <div ref={(input) => { this.inputRangeDiv = input; }} className='control-header-style'>
          <div className='consideration-icon-container'>
            <div className='consideration-icon-left'>
              <span className='glyphicon glyphicon-thumbs-down'/>
            </div>
            <div className='consideration-icon-right'>
              <span className='glyphicon glyphicon-thumbs-up'/>
            </div>
          </div>
          <InputRange
            maxValue={50}
            minValue={-50}
            value={this.state.sliderValue}
            onChange={this.handleConsiderationValueChanged}
            />
        </div>
      </div>
    </div>
  }
}

WizardConsideration.propTypes = {
  valueChanged : React.PropTypes.func.isRequired,
  considerationId : React.PropTypes.string
}

function mapStateToProps(state) {
  return {

  }
}

const WizardConsiderationContainer = connect(
  mapStateToProps,
  actionCreators
)(WizardConsideration)

export { WizardConsideration, WizardConsiderationContainer }
