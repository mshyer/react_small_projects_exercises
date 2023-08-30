import { CourseParts, CoursePart } from "../types";
import Part from "./Part";
interface ContentProps {
  courseParts: CourseParts,
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    // <div>
    //   {props.courseParts.map(function(part: CoursePart) {
    //      return <p key={part.name}>{part.name} {part.exerciseCount}</p>;
    //     })
    //   }
  
    // </div>
    <div>
      {props.courseParts.map(function(part: CoursePart) {
        return <Part key={part.name} coursePart={part}/>
      })}
    </div>
  );
}

export default Content;