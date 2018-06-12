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
    // bind the updateState function to this so we can call it later to change
    updateState = updateState.bind(this)
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
          <h1>Today&#39;s weather in {this.state.city}</h1>
          Current temperature: {this.state.curTemp} C<br />
          Min temperature: {this.state.minTemp} C<br />
          Max temperature: {this.state.maxTemp} C<br />
        </div>
      );
    }
  }
}

// a function to update the other component
var updateState = function (text) {
  // unbound apparently, this is ridiculously important
  // this.setState( {city: text}, this.handleSearch() )
  this.setState( {city: text}, () => this.handleSearch() )
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
      active1: true,
      active2: false,
      active3: false,
    };
  }

  componentDidMount() {
  }

  toronto() {
    this.setState({active1: !this.state.active1})
    this.setState({active2: false})
    this.setState({active3: false})
    updateState("Toronto")
  }

  montreal() {
    this.setState({active1: false})
    this.setState({active2: !this.state.active2})
    this.setState({active3: false})
    updateState("Montreal")
  }

  ottawa() {
    this.setState({active1: false})
    this.setState({active2: false})
    this.setState({active3: !this.state.active3})
    updateState("Ottawa")
  }

  render() {
    // toggleable classes for each button
    let btn_class1 = this.state.active1 ? "clickedButton" : "unclickedButton";
    let btn_class2 = this.state.active2 ? "clickedButton" : "unclickedButton";
    let btn_class3 = this.state.active3 ? "clickedButton" : "unclickedButton";

    return (
      <div>
        <button
        className={btn_class1}
        onClick={this.toronto.bind(this)}>
        Toronto
        </button>

        <button
        className={btn_class2}
        onClick={this.montreal.bind(this)}>
        Montreal</button>

        <button
        className={btn_class3}
        onClick={this.ottawa.bind(this)}>
        Ottawa</button>

        <Weather />

      </div>
    );
  }
}
