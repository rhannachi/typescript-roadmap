/**
 * Validation with Decorators
 */

interface ValidatorConfig {
    // ['required', 'positive']
    [validatableProp: string]: string[];
}

function Required(target: Course, propName: string) {
    target.setRegisteredValidators({[propName]: ['required']})
}

function PositiveNumber(target: Course, propName: string) {
    target.setRegisteredValidators({[propName]: ['positive']})
}

abstract class Validation {
    private registeredValidators: ValidatorConfig | undefined

     setRegisteredValidators(validator: ValidatorConfig) {
        this.registeredValidators = {
            ...this.registeredValidators,
            ...validator
        };
    }

    validate<T extends Record<string, any>>(obj: T) {
        if (!this.registeredValidators) {
            return true;
        }

        let isValid = true;

        for (const [prop, validators] of Object.entries(this.registeredValidators)) {
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
}

class Course extends Validation {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        super()
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

    if (!createdCourse.validate<Course>(createdCourse)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.log({ createdCourse });
});