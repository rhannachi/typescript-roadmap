/**
 * Generic Function example 1
 */

function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });

console.log('example 1');
console.log({ mergedObj });
console.log();

/**
 * Generic Function example 2
 */

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value.';
    if (element.length === 1) {
        descriptionText = 'Got 1 element.';
    }
    if (element.length > 1) {
        descriptionText = 'Got ' + element.length + ' elements.';
    }

    return [element, descriptionText];
}

console.log('example 2');
console.log({ countAndDescribe: countAndDescribe(['Sports', 'Cooking']) });
console.log();

/**
 * Generic Function example 3
 */

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U ) {
    return 'Value: ' + obj[key];
}

console.log('example 3');
console.log({ extractAndConvert: extractAndConvert({ name: 'Max', age: 20 }, 'name') });
console.log();

