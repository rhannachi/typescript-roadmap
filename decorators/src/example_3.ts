/**
 *  Property Decorators
 */

// function logCustom(value: object | string, color: 'red' | 'green' | 'yellow', background: 'red' | 'green' | 'yellow' | 'white' = 'white') {
//     console.log('%c' + JSON.stringify(value), `color: ${color}; background: ${background}; font-size: 30px`);
// }


function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!', { target, propertyName });
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!', { name, target, descriptor });
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator!', { name, target, descriptor });
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!', { name, target, position });
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive!');
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}