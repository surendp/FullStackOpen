import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Anecdote = ({ text, votes }) => (
  <>
    <div>{text}</div>
    <div>has {votes ? votes : 0} votes</div>
  </>
)

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const Header = ({ text }) => <h1>{text}</h1>
  
const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})
  const [maxVotedAnecdote, setMaxVotedAnecdote] = useState(0)

  const generateRandomInt = (max, currentValue) => {
    let randNumber = Math.floor(Math.random() * Math.floor(max))
    while (currentValue >= 0 && randNumber === currentValue) {
      randNumber = Math.floor(Math.random() * Math.floor(max))
    }
    return randNumber
  }

  const handleClickNext = () => {
    setSelected(generateRandomInt(6, selected))
  }

  const handleClickVote = () => {
    let newVotes = { ...votes }

    if (newVotes[selected]) {
      newVotes = {
        ...votes,
        [selected]: newVotes[selected] + 1,
      }
    } else {
      newVotes = {
        ...votes,
        [selected]: 1,
      }
    }

    setVotes(newVotes)
    setMaxVotedAnecdote(anecdoteWithMostVotes(newVotes))
  }

  const anecdoteWithMostVotes = newVotes => {
    let maxVotedAnecdote = 0
    let currentMaxVotes = 0
  
    Object.keys(newVotes).forEach(key => {
      if (newVotes[key] > currentMaxVotes) {
        currentMaxVotes = newVotes[key]
        maxVotedAnecdote = key
      }
    })
  
    return maxVotedAnecdote
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" handleClick={handleClickVote} />
      <Button text="next anecdote" handleClick={handleClickNext} />
      <Header text="Anecdote with most votes" />
      <Anecdote text={anecdotes[maxVotedAnecdote]} votes={votes[maxVotedAnecdote]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)