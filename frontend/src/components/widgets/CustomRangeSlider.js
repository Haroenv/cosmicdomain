import React, { Component, Fragment } from "react";
import Rheostat from "rheostat";

class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: this.props.min,
      max: this.props.max
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
        ...currentRefinement
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
      <Fragment>
        <Rheostat
          className='ais-RangeSlider'
          min={min}
          max={max}
          values={[currentRefinement.min, currentRefinement.max]}
          onChange={this.onChange}
          onValuesUpdated={this.onValuesUpdated}
        ></Rheostat>
        <div className='rheostat-marker'>
          <div>{this.state.min}</div>
          <div>{this.state.max}</div>
        </div>
      </Fragment>
    );
  }
}

export default RangeSlider;
