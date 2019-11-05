import React, { Component } from "react";
import $ from "jquery";
import "../sass/showWeather.sass";
import WeatherParamertBar from "./WeatherParamertBar";
import WeatherForOtherDay from "./WeatherForOtherDay";

import { Chart } from "react-google-charts";

const chartOptions = {
  title: "",
  width: "100%",
  height: "400px",
  backgroundColor: "transparent",
  vAxis: {
    gridlineColor: "transparent",
    baselineColor: "white",
    textStyle: { color: "white" }
  },
  hAxis: {
    gridlineColor: "transparent",
    baselineColor: "white",
    textStyle: { color: "white" }
  },
  is3D: true,
  legend: "none",
  lineWidth: 4,
  series: {
    0: { color: "white" }
  }
};

class ShowWeather extends Component {
  state = {
    currentWeatherId: 0
  };

  updateWeatherParamerBars() {
    $(".progress").each(function() {
      var $bar = $(this).find(".bar");
      var $val = $(this).find("span");
      var perc = $(this).attr("value");
      var type = $(this).attr("type");

      $({ p: 0 }).animate(
        { p: perc },
        {
          duration: 1000,
          easing: "swing",
          step: function(p) {
            $bar.css({
              transform: "rotate(" + (45 + p * 1.8) + "deg)"
            });
            if (type === "temp") $val.text((p - 50) | 0);
            else if (type === "pressure") $val.text((p + 950) | 0);
            else $val.text(p | 0);
          }
        }
      );
    });
  }

  componentDidMount() {
    this.updateWeatherParamerBars();
  }

  componentDidUpdate() {
    this.updateWeatherParamerBars();
  }

  calcTemeraturepOnPercentages(temp) {
    const temperature = Math.floor(temp);
    if (temperature === 0) {
      return 50;
    } else {
      return 50 + temperature;
    }
  }

  calcPressurenOnPercentages(pressure) {
    if (pressure === 1000) return pressure;
    else return 50 + (pressure - 1000);
  }

  changeCurrentWeatherId(e) {
    if (!e.targetID.indexOf("point")) {
      this.setState({
        currentWeatherId: e.targetID.replace("point#0#", "")
      });
    }
  }

  getDayName(weatherId) {
    const { weather } = this.props;
    const date = Date.parse(weather[weatherId].dt_txt);
    const day = new Date(date).getDay();
    switch (day) {
      case 1:
        return "Poniedziałek";
      case 2:
        return "Wtorek";
      case 3:
        return "Środa";
      case 4:
        return "Czwartek";
      case 5:
        return "Piątek";
      case 6:
        return "Sobota";
      case 7:
        return "Niedziela";
      default:
        break;
    }
  }

  render() {
    const { city, weather } = this.props;
    const { currentWeatherId } = this.state;

    const series = [];
    for (let i = 0; i < 8; i++) {
      series.push(Math.floor(weather[i].main.temp));
    }

    return (
      <section className="section--show-weather section-100vh">
        <h1 className="section--show-weather__city-name white">
          <span className="section--show-weather__city-name--big">
            Pogoda dla miasta:
          </span>{" "}
          <span>{city}</span>
        </h1>

        <div className="weather-parameter-container margin-top--50px">
          <div className="weather-parameter">
            <img
              className="weather-icon"
              src={`http://openweathermap.org/img/wn/${weather[0].weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <p className="font-size--big white">
              {Math.floor(weather[currentWeatherId].main.temp)}*C
            </p>
          </div>
          <WeatherParamertBar
            value={Math.floor(weather[currentWeatherId].main.humidity)}
            subfix="%"
            type="humidity"
          />
          <WeatherParamertBar
            value={Math.floor(weather[currentWeatherId].clouds.all)}
            subfix="%"
            type="cloudy"
          />
          <WeatherParamertBar
            value={this.calcPressurenOnPercentages(
              weather[currentWeatherId].main.pressure
            )}
            subfix="hPa"
            type="pressure"
          />
        </div>
        <div className="chart">
          <Chart
            width={"100%"}
            height={"400px"}
            chartType="LineChart"
            loader={<div>Ładowanie wykresu temperatury</div>}
            data={[
              ["x", "temperatura"],
              ["teraz", weather[0].main.temp],
              [
                weather[1].dt_txt.slice(10, 16),
                Math.floor(weather[1].main.temp)
              ],
              [
                weather[2].dt_txt.slice(10, 16),
                Math.floor(weather[2].main.temp)
              ],
              [
                weather[3].dt_txt.slice(10, 16),
                Math.floor(weather[3].main.temp)
              ],
              [
                weather[4].dt_txt.slice(10, 16),
                Math.floor(weather[4].main.temp)
              ],
              [
                weather[5].dt_txt.slice(10, 16),
                Math.floor(weather[5].main.temp)
              ],
              [
                weather[6].dt_txt.slice(10, 16),
                Math.floor(weather[6].main.temp)
              ],
              [
                weather[7].dt_txt.slice(10, 16),
                Math.floor(weather[7].main.temp)
              ]
            ]}
            options={chartOptions}
            chartEvents={[
              {
                eventName: "ready",
                callback: ({ chartWrapper, google }) => {
                  const chart = chartWrapper.getChart();
                  google.visualization.events.addListener(chart, "click", e =>
                    this.changeCurrentWeatherId(e)
                  );
                }
              }
            ]}
          />
        </div>
        <h2 className="white margin-top--50px">Prognoza na następne dni:</h2>
        <div className="weather-for-next-days white">
          <WeatherForOtherDay
            weather={weather[8]}
            getDayName={() => this.getDayName(8)}
          />
          <WeatherForOtherDay
            weather={weather[16]}
            getDayName={() => this.getDayName(16)}
          />
          <WeatherForOtherDay
            weather={weather[24]}
            getDayName={() => this.getDayName(24)}
          />
          <WeatherForOtherDay
            weather={weather[32]}
            getDayName={() => this.getDayName(32)}
          />
        </div>
      </section>
    );
  }
}

export default ShowWeather;
