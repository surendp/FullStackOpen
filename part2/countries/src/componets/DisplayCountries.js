import React, { useState } from 'react'
import WeatherData from './WeatherData'

const Country = ({ country, onlyName, handleClickShow }) => {
  if (onlyName) {
    return (
      <div>
        {country.name}
        <button
          onClick={() => handleClickShow(country)}
        >
          {'show'}
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <div>{`Capital ${country.capital}`}</div>
      <div>{`Population ${country.population}`}</div>
      <h2>languages</h2>
      <ul>
        {
          country.languages.map(language => (
            <li key={language.name}>
              {language.name}
            </li>
          ))
        }
      </ul>
      <img
        src={country.flag}
        alt="flag"
        height="100"
        width="100"
      />
      <WeatherData
        country={country}
      />
    </div>
  )
}

const DisplayCountries = ({ countries, searchQuery }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  const filteredCountries = countries.filter(
    country => country
      .name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  if (selectedCountry) {
    return <Country country={selectedCountry} />
  }

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  }

  return (
    <div>
      {
        filteredCountries.length > 10
          ? `Too many matches, specify another filter`
          : filteredCountries.map(country => (
            <Country
              key={country.name}
              country={country}
              handleClickShow={country => { setSelectedCountry(country) }}
              onlyName
            />
          ))
      }
    </div>
  )
}

export default DisplayCountries