
// --------- Example 1 ---------

// type AddFn = (a: number, b: number) => number;
interface AddFn {
    (a: number, b: number): number;
}

const add: AddFn = (n1: number, n2: number) => {
    return n1 + n2;
};

// --------- Example 2 ---------

interface Named {
    readonly name?: string;
    outputName?: string;
}

interface Greetable  {
    greet(phrase: string): void;
}

class Person implements Greetable, Named {
    name?: string;
    age = 30;

    constructor(name?: string) {
        if (name) {
            this.name = name;
        }
    }

    greet(phrase: string) {
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        } else {
            console.log('Hi !');
        }
    }
}

const user1: Greetable = new Person();
user1.greet('Hi there - I am');

console.log({ user1 });
