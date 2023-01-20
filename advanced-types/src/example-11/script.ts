/**
 * Exclude
 */

// type ItemExcluded = Exclude<'name' | 'description' | 'completed', 'name'>

type ItemExcluded1 = MyExclude<'name' | 'description' | 'completed', 'name'>
type ItemExcluded2 = MyExclude<'1' | '2' | '3', '1' | '3'>

const itemExcluded1: ItemExcluded1 = 'description' // => 'description' or 'completed'
const itemExcluded2: ItemExcluded2 = '2' // => '2'

// ----------------- MyExclude -------------------

type MyExclude<T extends string, U extends string> = T extends U ? never : T

