import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Part = ({ name, exercise }) => (
  <p>
    {name} {exercise}
  </p>
)

const Content = ({ parts }) => (
  <div>
    {
      parts.map((part, index) => (
        <Part
          key={`${part.name}-${index}`}
          name={part.name}
          exercise={part.exercises}
        />
      ))
    }
  </div>
)

const Total = ({ parts }) => {
  const numberOfExercises = parts
    .map(part => part.exercises)
    .reduce((acc, curr) => acc + curr)

  return (
    <p>Number of exercises { numberOfExercises }</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [{
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content
        parts={course.parts}
      />
      <Total
        parts={course.parts}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))