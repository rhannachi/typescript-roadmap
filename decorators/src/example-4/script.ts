/**
 * Validation with Decorators
 */

interface ValidatorConfig {
    // ['required', 'positive']
    [validatableProp: string]: string[];
}

let registeredValidators: ValidatorConfig = {};

function Required(_target: any, propName: string) {
    registeredValidators = {
        ...registeredValidators,
        [propName]: ['required']
    };
}

function PositiveNumber(_target: any, propName: string) {
    registeredValidators = {
        ...registeredValidators,
        [propName]: ['positive']
    };
}

function validate<T extends Record<string, any>>(obj: T) {
    if (!registeredValidators) {
        return true;
    }

    let isValid = true;

    for (const [prop, validators] of Object.entries(registeredValidators)) {
        for (const validator of validators) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
     }

    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();

    const titleEl = <HTMLInputElement>document.getElementById('title');
    const priceEl = <HTMLInputElement>document.getElementById('price');

    const title = titleEl.value;
    const price = Number(priceEl.value);

    const createdCourse = new Course(title, price);

    if (!validate<Course>(createdCourse)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.log({ createdCourse });
});