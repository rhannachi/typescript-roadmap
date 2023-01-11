/**
 ** *** Intersection type ***
 * Un type d'intersection crée un nouveau type en combinant plusieurs types existants.
 */
//-------------Example 1 --------------
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

//-------------Example 2 --------------

type Combinable = string | number;
type Numeric = number | boolean;
// Le nouveau type c'est l'intersection des types qu'ils ont en commun .
type Universal = Combinable & Numeric;

const u1: Universal = 8;
// const u2: Universal = '8'; // => type error
// const u1: Universal = false; // => type error

//-------------Example 1 (in) --------------
/**
 * *** Type Guards ***
 * TypeScript utilise des opérateurs JavaScript intégrés tels que:
 * typeof, instanceof et in, pour déterminer si un objet contient une propriété.
 */

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate);
  }
}

printEmployeeInformation({ name: 'Manu', startDate: new Date() });

//-------------Example 2 (instanceof) --------------

class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo ...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

/**
 * Discriminated Unions
 */

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});

/**
 *  Index Properties
 */

interface ErrorCustom {
  [prop: string]: string;
}

const error: ErrorCustom = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character!'
};