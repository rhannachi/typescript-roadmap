
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

console.log('Example 5 (1)')
moveAnimal({type: 'bird', flyingSpeed: 10});
console.log()

/**
 * use class
 */

abstract class Animal1 {}

class Bird1 extends Animal1{
  // type: 'bird';
  public flyingSpeed: number;
  constructor(flyingSpeed: number) {
    super();
    this.flyingSpeed = flyingSpeed
  }
}

class Horse1 extends Animal1{
  // type: 'horse';
  public runningSpeed: number;
  constructor(runningSpeed: number) {
    super();
    this.runningSpeed = runningSpeed
  }
}


function moveAnimal1(animal: Animal1) {
  let speed;
  if (animal instanceof Bird1) {
    speed = animal.flyingSpeed
  }
  if (animal instanceof Horse1) {
    speed = animal.runningSpeed
  }
  console.log('Moving at speed: ' + speed);
}

console.log('Example 5 (2)')
const bird1 = new Bird1(10)
moveAnimal1(bird1);
console.log()