import { CoursePart } from "../types";
interface PartProps {
  coursePart: CoursePart,
}

const Part = (props: PartProps): JSX.Element => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };
  const jsxProperties = function(part: CoursePart) {
    switch (part.kind) {
      case "background":
        return <p>
          {part.name} 
          {part.exerciseCount} 
          {part.backroundMaterial} 
          {part.description}
        </p>;
      case "basic":
        return <p>
          {part.name} 
          {part.exerciseCount} 
          {part.description}
        </p>;
      case "group":
        return <p>
          {part.name} 
          {part.exerciseCount} 
          {part.groupProjectCount}
        </p>;
      default:
        return assertNever(part);
    }
  };

  return (
    <div>
      {jsxProperties(props.coursePart)}
    </div>
  );
}

export default Part;

// {props.courseParts.map(function(part: CoursePart) {
//   return <p key={part.name}>{part.name} {part.exerciseCount}</p>;
//  })
// }