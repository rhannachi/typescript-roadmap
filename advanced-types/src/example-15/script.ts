/**
 * Extract
 */

// type ItemExcluded = Extract<'name' | 'description' | 'completed', 'description' | 'name'>

type ItemExtracted1 = MyExtract<'name' | 'description' | 'completed', 'description' | 'name'>
type ItemExtracted2 = MyExtract<'1' | '2' | '3', '1' | '3'>

const itemExtracted1: ItemExtracted1 = 'description' // 'description' or 'name'
const itemExtracted2: ItemExtracted2 = '3' // '1' or '3'

// ----------------- MyExclude -------------------

type MyExtract<T extends string, U extends string> = U extends T ? U : never

