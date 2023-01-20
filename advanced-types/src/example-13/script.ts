/**
 * FirstElement
 */

const firstItem1: First<['name', 'description', 'completed']> = 'name'
const firstItem2: First<['1', '2', '3']> = '1'

// ----------------- MyExclude -------------------

type First<T extends Array<string>> = T[0]
