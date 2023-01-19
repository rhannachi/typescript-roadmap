import { Component } from "./component.js";
import { Item } from "./item.js";
import { TaskModel, TaskStatus } from "../models/index.js";
import { Subject } from "../observers/index.js";
import { DragTarget, ID_HOST_ELEMENT, ID_TASK_LIST, ID_TASK_LIST_TEMPLATE } from "../utils/index.js";
import {AutoBind} from "../decorators/index.js";

export class List extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
    }

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

    @AutoBind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }

    @AutoBind
    dropHandler(event: DragEvent) {
        const taskId = event.dataTransfer!.getData('text/plain');
        const task = this.subject.getState().find(task => task.id === taskId)

        if (task && task.status !== this.status) {
            const newTask: TaskModel = {
                ...task,
                status: this.status
            }
            this.subject.setObjectFromState(taskId, newTask)
        }
    }
    @AutoBind
    dragLeaveHandler(_event: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }
}
