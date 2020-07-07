import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherData = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then(response => {
        setWeatherData(response.data)
      })
  }, [])

  if (!weatherData) {
    return ''
  }

  return (
    <div>
      <h2>{`Weather in ${country.capital}`}</h2>
      <div><b>temperature:</b>{` ${weatherData.current.temperature} Celcius`}</div>
      <img
        alt="weather"
        src={weatherData.current.weather_icons[0]}
      />
      <div><b>wind:</b>{` ${weatherData.current.wind_speed} mph direction ${weatherData.current.wind_dir}`}</div>
    </div>
  )
}

export default WeatherData