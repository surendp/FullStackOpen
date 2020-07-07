import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const { parts } = course
  const sum = parts.reduce((acc, part) => acc + part.exercises, 0)

  return(
    <p>
      <b>Total of {sum} exercises</b>
    </p>
  ) 
}

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ course }) => {
  const { parts } = course
  return (
    <div>
      {
        parts.map(part => <Part key={part.id} part={part} />)
      }
    </div>
  )
}

const Course = ({ courses }) => (
  <>
    {
      courses.map(course => (
        <div key={course.id}>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>
      ))
    }
  </>
)

export default Course