import React, { FC } from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  courseName: string;
}

interface Part {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: Array<Part>;
}

const Header: FC<HeaderProps> = ({ courseName }) => (
  <h1>{courseName}</h1>
);

const Part: FC<Part> = ({ name, exerciseCount }) => (
  <p>
    {name} {exerciseCount}
  </p>
);

const Content: FC<ContentProps> = ({ courseParts }) => (
  <>
    {
      courseParts.map(({ name, exerciseCount }) => (
        <Part
          name={name}
          exerciseCount={exerciseCount}
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
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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