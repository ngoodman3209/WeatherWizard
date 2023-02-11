import React from 'react';
import axios from 'axios';
import './Weather.css';
import WeatherWizard from './WeatherWizard.jpg';

class Weather extends React.Component {
  state = {
    location: 'New York, NY',
    weatherData: []
  };

  handleSubmit = event => {
    event.preventDefault();

    const API_KEY = '75db8af91e8a422286c2f74a1a291d7a';
    const location = this.state.location;
    
    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&key=${API_KEY}`)
      .then(response => {
        const weatherData = response.data.data;
        this.setState({
          weatherData
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  convertTemperature = (tempCelsius) => {
    const tempKelvin = tempCelsius + 273.15;
    const tempFahrenheit = tempCelsius * 9/5 + 32;
    return {
      kelvin: tempKelvin,
      fahrenheit: tempFahrenheit
    };
  };

  render() {
    let weatherData = this.state.weatherData;
  
    return (
      <div className="weather-container">
        <header className="weather-header">
          <img src={WeatherWizard} alt="Weather wizard illustration" />
          <h1 className="title">WeatherWizard</h1>
        </header>
        <form onSubmit={this.handleSubmit} className="search-form">
          <input type="text" placeholder="City, State" value={this.state.location} onChange={this.handleChange} />
          <button type="submit">Search</button>
        </form>
        <div className="weather-data-container">
          <div className="forecast-container">
            {weatherData.map((day, index) => {
              const date = new Date(day.valid_date);
              const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              const dayOfWeek = daysOfWeek[date.getUTCDay()];
  
              return (
                <div className="forecast-item" key={index}>
                  <h2>{dayOfWeek}</h2>
                  <p>Temperature: {this.convertTemperature(day.temp).fahrenheit.toFixed(2)} Fahrenheit</p>
                  <p>Humidity: {day.rh}%</p>
                  <p>Wind Speed: {(day.wind_spd * 2.237).toFixed(2)} mph</p>
                  <p>Precipitation: {day.precip}%</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
