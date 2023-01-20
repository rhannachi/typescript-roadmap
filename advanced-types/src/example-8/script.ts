/**
 * Pick
 */

interface Todo {
    name: string
    description: string
    completed: boolean
}

// type TodoCustom = Pick<Todo, 'name' | 'completed'>
type TodoCustom = MyPick<Todo, 'name' | 'completed'>

const todo: TodoCustom = {
    name: 'my trip',
    completed: false,
}

// ----------------- MyPick -------------------

type MyPick<T extends object, U extends keyof T> = { [P in U]: T[P] }

