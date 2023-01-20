/**
 * Pick
 */

interface Todo {
    name: string
    description: string
    completed: boolean
}

// type TodoPicked = Pick<Todo, 'name' | 'completed'>
type TodoPicked = MyPick<Todo, 'name' | 'completed'>

const todoPicked: TodoPicked = {
    name: 'my trip',
    completed: false,
}

// ----------------- MyPick -------------------

type MyPick<T extends object, U extends keyof T> = {
    [KEY in U]: T[KEY]
}

