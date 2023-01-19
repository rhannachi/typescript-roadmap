
const STATUS = ['active', 'finished'] as const
export type TaskStatus = typeof STATUS[number]

export interface TaskModel {
    id: string
    title: string,
    description: string,
    people: number,
    status: TaskStatus
}

