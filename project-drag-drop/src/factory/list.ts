import { Component } from "./component.js";
import { Item } from "./item.js";
import { TaskModel, TaskStatus } from "../models/index.js";
import { Subject } from "../observers/index.js";
import {ID_HOST_ELEMENT, ID_TASK_LIST, ID_TASK_LIST_TEMPLATE} from "../utils/index.js";

export class List extends Component<HTMLDivElement, HTMLElement> {
    private readonly status: TaskStatus
    tasks: TaskModel[] = [];

    constructor(status: TaskStatus, subject: Subject<TaskModel>) {
        super(ID_TASK_LIST_TEMPLATE, ID_HOST_ELEMENT, false, `${status}-tasks`);

        this.subject = subject
        this.subject.attach(this);

        this.status = status

        this.configure();
        this.renderContent();
    }

    configure() {}

    renderContent() {
        this.element.querySelector('ul')!.id = `${this.status}-${ID_TASK_LIST}`;
        this.element.querySelector('h2')!.textContent = this.status.toUpperCase() + ' TASKS';
    }

    private filterTasks(tasks: TaskModel[], status: TaskStatus): TaskModel[] {
        return tasks.filter(task => {
            if (status === 'active') {
                return task.status === 'active';
            }
            return task.status === 'finished';
        });
    }

    private renderTasks() {
        const listEl = <HTMLUListElement>document.getElementById(`${this.status}-${ID_TASK_LIST}`);
        listEl.innerHTML = '';
        for (const task of this.tasks) {
            const hostId = this.element.querySelector('ul')!.id
            new Item(hostId, task);
        }
    }

    update(): void {
        this.tasks = this.filterTasks(this.subject.getState(), this.status)
        this.renderTasks();
    }
}
