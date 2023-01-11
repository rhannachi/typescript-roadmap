

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U ) {
    return 'Value: ' + obj[key];
}

console.log('example 3');
console.log({ extractAndConvert: extractAndConvert({ name: 'Max', age: 20 }, 'name') });
console.log();

