/**
 * Readonly
 */

interface Todo {
    name: string
    description: string
    completed: boolean
}

// const todoR: Readonly<Todo> = {
//     name: 'my trip',
//     description: 'my description',
//     completed: false
// }

const todoR: MyReadonly<Todo> = {
    name: 'my trip',
    description: 'my description',
    completed: false
}

// todoR.description = 'my description 2' => Error
// todoR.name = 'my trip 2' => Error

// ----------------- MyReadonly -------------------

type MyReadonly<T extends object> = {
    readonly [KEY in keyof T]: T[KEY]
}

