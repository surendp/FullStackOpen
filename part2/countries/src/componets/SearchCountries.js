import React from 'react'

const SearchCountries = ({ searchQuery, handleChangeSearchQuery }) => (
  <form onSubmit={event => event.preventDefault()}>
    Find countries
    <input
      value={searchQuery}
      onChange={handleChangeSearchQuery}
    />
  </form>
)

export default SearchCountries