import React, { Component } from "react";

class SearchCity extends Component {
  render() {
    return (
      <section className="section--search-city">
        <div className="centerY">
          <h1 className="white"> Prognoza pogody </h1>
          <div className="search">
            <input
              type="text"
              className="input--text"
              placeholder="Wpisz miasto"
              value={this.props.inputValue}
              onChange={this.props.handleSearchInputValue}
            />
            <input
              type="submit"
              className="input--submit"
              value="Szukaj"
              onClick={this.props.handleSeatchAccept}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default SearchCity;
