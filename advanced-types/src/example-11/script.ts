/**
 * Exclude
 */

type ItemExcluded = MyExclude<'name' | 'description' | 'completed', 'name'>

const itemExcluded: ItemExcluded = 'description'

// ----------------- MyExclude -------------------

type MyExclude<T extends string, U extends string> = T extends U ? never : T

