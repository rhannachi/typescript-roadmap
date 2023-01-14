/**
 * Generic Utility Types
 */

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string,): Partial<CourseGoal> {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  return courseGoal
}

console.log('example 5');
console.log({ createCourseGoal: createCourseGoal('my title', 'my description') })
console.log();

