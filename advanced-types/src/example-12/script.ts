/**
 * Exclude
 */

type ItemIncludes1 = Includes<['name', 'description', 'completed'], 'name'> // => true
type ItemIncludes2 = Includes<['name', 'description', 'completed'], 'ssss'> // => false

// ----------------- MyExclude -------------------

type Includes<T extends Array<string>, U extends string> = U extends T[number] ? true : false
