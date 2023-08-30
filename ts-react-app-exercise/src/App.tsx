import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import { CourseParts } from "./types";

const App = () => {
  const courseName = "Half Stack application development";
  // const courseParts: CourseParts = [
  //   {
  //     name: "Fundamentals",
  //     exerciseCount: 10
  //   },
  //   {
  //     name: "Using props to pass data",
  //     exerciseCount: 7
  //   },
  //   {
  //     name: "Deeper type usage",
  //     exerciseCount: 14
  //   }
  // ];

  // const courseParts: CourseParts = [
  //   {
  //     name: "Fundamentals",
  //     exerciseCount: 10,
  //     description: "This is an awesome course part",
  //     kind: "basic"
  //   },
  //   {
  //     name: "Using props to pass data",
  //     exerciseCount: 7,
  //     groupProjectCount: 3,
  //     kind: "group"
  //   },
  //   {
  //     name: "Basics of type Narrowing",
  //     exerciseCount: 7,
  //     description: "How to go from unknown to string",
  //     kind: "basic"
  //   },
  //   {
  //     name: "Deeper type usage",
  //     exerciseCount: 14,
  //     description: "Confusing description",
  //     backroundMaterial: "https://type-level-typescript.com/template-literal-types",
  //     kind: "background"
  //   },
  // ];
  const courseParts: CourseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    // {
    //   name: "TypeScript in frontend",
    //   exerciseCount: 10,
    //   description: "a hard part",
    //   poop: 'popp',
    //   kind: "poop"
    // },
  ];

  return (
    // <div>
    //   <h1>{courseName}</h1>
    //   <p>
    //     {courseParts[0].name} {courseParts[0].exerciseCount}
    //   </p>
    //   <p>
    //     {courseParts[1].name} {courseParts[1].exerciseCount}
    //   </p>
    //   <p>
    //     {courseParts[2].name} {courseParts[2].exerciseCount}
    //   </p>
    //   <p>
    //     Number of exercises{" "}
    //     {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    //   </p>
    // </div>
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

export default App;