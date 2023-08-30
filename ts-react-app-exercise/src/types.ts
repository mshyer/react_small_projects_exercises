// export interface Course {
//   name: string,
//   exerciseCount: number,
// }

export type CourseParts = CoursePart[];

// export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

// interface CoursePartBasic {
//   name: string;
//   exerciseCount: number;
//   description: string;
//   kind: "basic"
// }

// interface CoursePartGroup {
//   name: string;
//   exerciseCount: number;
//   groupProjectCount: number;
//   kind: "group"
// }

// interface CoursePartBackground {
//   name: string;
//   exerciseCount: number;
//   description: string;
//   backroundMaterial: string;
//   kind: "background"
// }
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartDescribe {
  kind: "basic"
}

// interface CoursePartPoop extends CoursePartDescribe {
//   kind: "poop",
//   poop: string,
// }

interface CoursePartDescribe extends CoursePartBase {
  description: string;
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackround extends CoursePartDescribe {
  backroundMaterial: string;
  kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackround;

// const courseParts = [
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