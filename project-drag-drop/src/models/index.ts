
const STATUS = ['active', 'finished'] as const
export type ProjectStatus = typeof STATUS[number]

export interface Project {
    id: string
    title: string,
    description: string,
    people: number,
    status: ProjectStatus
}

