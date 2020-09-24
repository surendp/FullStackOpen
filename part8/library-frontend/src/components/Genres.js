import React from 'react'

const Genres = ({
  handleClickGenre
}) => (
  <div>
    <button onClick={handleClickGenre('refactoring')}>refactoring</button>
    <button onClick={handleClickGenre('agile')}>agile</button>
    <button onClick={handleClickGenre('patterns')}>patterns</button>
    <button onClick={handleClickGenre('design')}>design</button>
    <button onClick={handleClickGenre('crime')}>crime</button>
    <button onClick={handleClickGenre('classic')}>classic</button>
    <button onClick={handleClickGenre(null)}>all genres</button>
  </div>
)

export default Genres