import React from "react";

const WeatherForOtherDay = props => {
  const { weather, getDayName } = props;
  return (
    <div className="weather-for-next-days__day">
      <p className="day-name">{getDayName()}</p>
      <div className="weather-for-next__parameters">
        <ul>
          <li className="padding-top--20px">
            <i className="fas fa-thermometer-three-quarters"></i>:{" "}
            {Math.floor(weather.main.temp)}C
          </li>
          <li>
            <i className="fas fa-tint"></i>: {Math.floor(weather.main.humidity)}
            %
          </li>
          <li>
            <i className="fas fa-cloud"></i>: {Math.floor(weather.clouds.all)}%
          </li>
          <li>
            <i className="fas fa-clock"></i>: {weather.main.pressure}hPa
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WeatherForOtherDay;
