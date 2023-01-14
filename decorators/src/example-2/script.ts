/**
 * Multiple Decorators
 */

function LoggerA(logString: string) {
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, id: string) {
  return function(constructor: any) {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = template;
      const p = new constructor();
      element.querySelector('h1')!.textContent = p.name;
    }
  }
}

@LoggerA('LOGGING - PERSON A')
@WithTemplate('<h1>My Person A Object</h1>', 'div_id')
class PersonA {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const personA = new PersonA();

console.log({ personA });
