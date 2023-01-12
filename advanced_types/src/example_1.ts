/**
 ** *** Intersection type ***
 * Un type d'intersection crée un nouveau type en combinant plusieurs types existants.
 */

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// Le nouveau type c'est la combinaison des propriétés de Employee et Admin .
// interface ElevatedEmployee extends Employee, Admin {}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};

console.log('Example 1')
console.log({ e1 })
console.log()