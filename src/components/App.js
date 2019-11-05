import React, { Component } from "react";
import SearchCity from "./SearchCity";
import ShowWeather from "./ShowWeather";
import Footer from "./Footer";
import "../sass/style.sass";
import "../sass/colors.sass";
import "../sass/style.css";
import "../sass/cdn.sass";

class App extends Component {
  state = {
    searchValue: "",
    selectedCity: "",
    weather: ""
  };

  handleSearchInputValue = e => {
    this.setState({ searchValue: e.target.value });
  };

  handleSeatchAccept = () => {
    if (this.state.searchValue !== "") {
      const API = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.searchValue}&appid=aa1cd98455683191d68a77ec6a30834d&units=metric`;
      fetch(API)
        .then(r => r.json())
        .then(r => {
          if (r.cod === "404") {
            this.setState({
              searchValue: ""
            });
            alert("Nie ma takiego miasta");
          } else {
            let cityName =
              this.state.searchValue[0].toUpperCase() +
              this.state.searchValue.slice(1);
            this.setState({
              weather: r,
              selectedCity: cityName,
              searchValue: ""
            });
          }
        });
    } else {
      alert("Nie wpisałeś miasta");
    }
  };

  setBackground() {
    const date = new Date();
    const timeHours = date.getHours();

    if (timeHours >= 6 && timeHours < 9) {
      document.querySelector("body").classList.add("time-sunrise");
    } else if (timeHours >= 9 && timeHours < 19) {
      document.querySelector("body").classList.add("time-day");
    } else if (timeHours >= 19 && timeHours < 22) {
      document.querySelector("body").classList.add("time-sunset");
    } else if (timeHours >= 22 || timeHours < 6) {
      document.querySelector("body").classList.add("time-night");
    }
  }

  render() {
    const { searchValue, selectedCity, weather } = this.state;

    this.setBackground();

    return (
      <div className="App">
        {selectedCity === "" && (
          <SearchCity
            handleSearchInputValue={this.handleSearchInputValue}
            handleSeatchAccept={this.handleSeatchAccept}
            inputValue={searchValue}
          />
        )}

        {selectedCity !== "" && (
          <ShowWeather city={selectedCity} weather={weather.list} />
        )}

        <Footer />
      </div>
    );
  }
}

export default App;
