import React, { FC } from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  courseName: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseBasePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CourseBasePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourseBasePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CourseBasePartWithDescription {
  name: "Typescript with React";
  peerReview: number;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

interface ContentProps {
  courseParts: Array<CoursePart>;
}

interface PartProps {
  part: CoursePart;
}

const Header: FC<HeaderProps> = ({ courseName }) => (
  <h1>{courseName}</h1>
);

const Part: FC<PartProps> = ({ part }) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.name) {
    case "Fundamentals":
      return <p>{part.name} {part.exerciseCount} {part.description}</p>;
    case "Using props to pass data":
      return <p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>;
    case "Deeper type usage":
      return <p>{part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>;
    case "Typescript with React":
      return <p>{part.name} {part.exerciseCount} {part.description} {part.peerReview}</p>;
    default:
      return assertNever(part);
  }
};

const Content: FC<ContentProps> = ({ courseParts }) => (
  <>
    {
      courseParts.map(part => (
        <Part
          key={part.name}
          part={part}
        />
      ))
    }
  </>
)

const Total: FC<ContentProps> = ({ courseParts }) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

const App: FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Typescript with React",
      exerciseCount: 7,
      description: "With clear instructions it is easy to learn typescript with react",
      peerReview: 10,
    }
  ];

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));