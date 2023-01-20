/**
 * Conditional Type
 */

// -------------------- Example 1 ---------------

type MyType = number // number
type MyType2 = MyType // number

type MyConditionalType = MyType extends string ? string : null // null
type MyConditionalType2 = MyType extends number ? string : null // string

type MyType3<T> = T extends number ? "number" : "random"
type WithNumber = MyType3<number> // "number"
type WithNumber2 = MyType3<string> // "random"

// -------------------- Example 2 ---------------

type TypeName<T> =
    T extends string ? "string" :
        T extends number ? "number" :
            T extends boolean ? "boolean" :
                T extends undefined ? "undefined" :
                    T extends Function ? "function" : object

function typeName<T>(args: T): TypeName<T> {
    return typeof args as TypeName<T>
}

const str = typeName("Luc") // "string"
const str2 = typeName(22) // "number"