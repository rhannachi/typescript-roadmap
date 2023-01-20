/**
 *  Index Properties
 */

// type ErrorCustom = Record<string, string>

interface ErrorCustom {
  [prop: string]: string;
}

const error: ErrorCustom = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character!'
};

console.log('Example 6')
console.log({ error });
console.log()

