import React, { Component } from "react";
import $ from "jquery";

const Icon = props => {
  const { type } = props;
  if (type === "temp") {
    return <i className="fas fa-thermometer-three-quarters"></i>;
  } else if (type === "humidity") {
    return <i className="fas fa-tint"></i>;
  } else if (type === "cloudy") {
    return <i className="fas fa-cloud"></i>;
  } else if (type === "pressure") {
    return <i className="fas fa-clock"></i>;
  } else {
    return <p>ERROR</p>;
  }
};

class WeatherParamertBar extends Component {
  render() {
    const { value, subfix, type } = this.props;
    return (
      <div className="weather-parameter white">
        <div className="progress" value={value} type={type}>
          <div className="barOverflow">
            <div className="bar"></div>
          </div>
          <div>
            <Icon type={type} />
          </div>
          <span></span>
          {subfix}
        </div>
      </div>
    );
  }
}

export default WeatherParamertBar;
