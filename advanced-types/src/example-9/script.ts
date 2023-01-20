/**
 * Omit
 */

interface Todo {
    name: string
    description: string
    completed: boolean
}

// type TodoOmitted = Omit<Todo, 'name' | 'completed'>
type TodoOmitted = MyOmit<Todo, 'name' | 'completed'>

const todoOmitted: TodoOmitted = {
    description: 'my description',
}

// ----------------- MyOmit -------------------

type MyOmit<T extends object, U extends keyof T> = {
    [KEY in Exclude<keyof T, U> ]: T[KEY]
}

