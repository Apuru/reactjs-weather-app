import React from 'react';

// const request = require('request');
import request from 'request';

var apiKey = "a496cf85e1b4576ff6c05fe6f881e5b9";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      city: "Toronto",
      curTemp: undefined,
      minTemp: undefined,
      maxTemp: undefined
    }
    resolveSearch = resolveSearch.bind(this)
  }

  componentDidMount() {
    // initial search
    this.setState({
      isLoading: true,
    })

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${apiKey}&units=metric`
    request(url, function (err, response, body) {
      let weather = JSON.parse(body)
      let temp1 = weather.main.temp
      let temp2 = weather.main.temp_min
      let temp3 = weather.main.temp_max
      resolveSearch(temp1, temp2, temp3)
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      this.handleSearch()
    }
  }

  handleSearch() {
    this.setState({
      isLoading: true,
    })

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${apiKey}&units=metric`

    request(url, function (err, response, body) {
      let weather = JSON.parse(body)
      let temp1 = weather.main.temp
      let temp2 = weather.main.temp_min
      let temp3 = weather.main.temp_max
      // setTimeout to check loading screen, can remove
      setTimeout(function() {
        resolveSearch(temp1, temp2, temp3)
      }, 300);
    })

  }

  render() {
    if (this.state.isLoading) {
      return (
        <h1>Loading...</h1>
      );
    }
    else {
      return (
        <div>
          <h1>Today&#39;s weather in {this.props.city}</h1>
          Current temperature: {this.state.curTemp} C<br />
          Min temperature: {this.state.minTemp} C<br />
          Max temperature: {this.state.maxTemp} C<br />
        </div>
      );
    }
  }
}

var resolveSearch = function (temp1, temp2, temp3) {
  this.setState({
    curTemp: temp1,
    minTemp: temp2,
    maxTemp: temp3,
    isLoading: false
  });
}

export default class Buttons extends React.Component {
  constructor() {
    super();
    this.state = {
      city: "Toronto",
    };
  }

  // a function to update the other component
  updateState(text) {
    // unbound apparently, this is ridiculously important
    // this.setState( {city: text}, this.handleSearch() )
    this.setState( {city: text} )
  }

  toronto() {
    this.updateState("Toronto")
  }

  montreal() {
    this.updateState("Montreal")
  }

  ottawa() {
    this.updateState("Ottawa")
  }

  render() {
    var btn_class = (cityButton) => {
      if (this.state.city == cityButton) {
        return "clickedButton"
      } else {
        return "unclickedButton"
      }
    }

    return (
      <div>
        <button
        className={btn_class("Toronto")}
        onClick={this.toronto.bind(this)}>

        Toronto
        </button>

        <button
        className={btn_class("Montreal")}
        onClick={this.montreal.bind(this)}>
        Montreal</button>

        <button
        className={btn_class3}
        onClick={this.ottawa.bind(this)}>
        Ottawa</button>

        <Weather city={this.state.city} />

      </div>
    );
  }
} // Monday 3pm
