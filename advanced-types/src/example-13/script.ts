/**
 * FirstElement
 */

const firstItem1: FirstElement<['name', 'description', 'completed']> = 'name'
const firstItem2: FirstElement<['1', '2', '3']> = '1'

// ----------------- MyExclude -------------------

type FirstElement<T extends Array<string>> = T[0]
