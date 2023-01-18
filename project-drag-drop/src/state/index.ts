import { Project } from "../models/index.js";

type Listener<T> = (items: T[]) => void;
class State<T> {
    protected listeners: Listener<T>[] = [];

    emitEvents(items: T[]) {
        for (const listenerFn of this.listeners) {
            listenerFn([...items]);
        }
    }

    receiveEvents(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super()
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, people: number) {
        this.projects.push({
            id: Math.random().toString(),
            title,
            description,
            people,
            status: 'active'
        });

        this.emitEvents(this.projects)
    }
}

export default ProjectState