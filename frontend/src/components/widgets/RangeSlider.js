import React from "react";
import Rheostat from "rheostat";
import { connectRange } from "react-instantsearch-dom";
import "rheostat/initialize";
import "./RangeSlider.css";

class RangeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: props.min,
      max: props.max
    };
  }

  componentDidUpdate(prevProps) {
    const { currentRefinement } = prevProps;
    if (
      this.props.canRefine &&
      (currentRefinement.min !== this.props.currentRefinement.min ||
        currentRefinement.max !== this.props.currentRefinement.max)
    ) {
      this.setState({
        ...this.props.currentRefinement
      });
    }
  }

  onChange = ({ values: [min, max] }) => {
    const { currentRefinement, refine } = this.props;
    if (currentRefinement.min !== min || currentRefinement.max !== max) {
      refine({
        min,
        max
      });
    }
  };

  onValuesUpdated = ({ values: [min, max] }) => {
    this.setState({
      min,
      max
    });
  };

  render() {
    const { min, max, currentRefinement } = this.props;
    if (min === max) {
      return null;
    }

    return (
      <div className='range-slider'>
        <Rheostat
          className='ais-RangeSlider'
          min={min}
          max={max}
          values={[currentRefinement.min, currentRefinement.max]}
          onChange={this.onChange}
          onValuesUpdated={this.onValuesUpdated}
        >
          <div
            className='rheostat-marker rheostat-marker--large'
            style={{ left: 0 }}
          >
            <div className='rheostat-value'>{this.state.min}</div>
          </div>
          <div
            className='rheostat-marker rheostat-marker--large'
            style={{ right: 0 }}
          >
            <div className='rheostat-value'>{this.state.max}</div>
          </div>
        </Rheostat>
      </div>
    );
  }
}

export default connectRange(RangeSlider);
