import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchCountries from './componets/SearchCountries'
import DisplayCountries from './componets/DisplayCountries'


const App = () => {
  const [countries, setCountries] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleChangeSearchQuery = event => {
    setSearchQuery(event.target.value.trim())
  }

  if (!countries) {
    return <div>Loading</div>
  }

  return  (
    <div>
      <SearchCountries
        searchQuery={searchQuery}
        handleChangeSearchQuery={handleChangeSearchQuery}
      />
      <DisplayCountries
        countries={countries}
        searchQuery={searchQuery}
      />
    </div>
  )
}

export default App