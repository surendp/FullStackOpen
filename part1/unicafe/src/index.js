import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ headerText }) => <h1>{ headerText }</h1>

const Button = ({
  text,
  handleClick,
}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({
  text,
  value,
}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Buttons = ({ handleClick }) => (
  <>
    <Button text="good" handleClick={handleClick('good')}/>
    <Button text="neutral" handleClick={handleClick('neutral')}/>
    <Button text="bad" handleClick={handleClick('bad')}/>
  </>
)

const Statistics = ({
  good,
  neutral,
  bad,
}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = `${good / all * 100} %`

  if (all === 0) {
    return <div>No feedback given</div>
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = props => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = buttonType => {
    let handleClickFunction = () => {}

    switch (buttonType) {
      case 'good': {
        handleClickFunction = () => {
          setGood(good + 1)
        }
        break
      }
      
      case 'neutral': {
        handleClickFunction = () => {
          setNeutral(neutral + 1)
        }
        break
      }

      case 'bad': {
        handleClickFunction = () => {
          setBad(bad + 1)
        }
        break
      }
      
      default:
        break
    }

    return handleClickFunction
  }

  return (
    <div>
      <Header headerText="Give Feedback" />
      <Buttons handleClick={handleClick} />
      <Header headerText="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
