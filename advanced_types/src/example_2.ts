
/**
 ** *** Intersection type ***
 */

type Combinable = string | number;
type Numeric = number | boolean;
// Le nouveau type c'est l'intersection des types qu'ils ont en commun .
type Universal = Combinable & Numeric;

const u1: Universal = 8;
// const u2: Universal = '8'; // => type error
// const u1: Universal = false; // => type error

console.log('Example 2')
console.log({ u1 })
console.log()