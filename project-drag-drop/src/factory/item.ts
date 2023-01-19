import { TaskModel } from "../models/index.js";
import { Component } from "./component.js";

export class Item extends Component<HTMLUListElement, HTMLLIElement> {
    private task: TaskModel;

    constructor(hostId: string, task: TaskModel) {
        super('single-project', hostId, false, task.id);
        this.task = task;

        this.configure();
        this.renderContent();
    }

    configure() {}

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.task.title;
        this.element.querySelector('h3')!.textContent = this.task.people.toString();
        this.element.querySelector('p')!.textContent = this.task.description;
    }

    update(): void {}
}
