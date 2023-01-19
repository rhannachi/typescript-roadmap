import { TaskModel } from "../models/index.js";
import { Component } from "./component.js";
import { ID_TASK_ITEM_TEMPLATE } from "../utils/index.js";
import { Draggable } from "../utils/index.js";
import { AutoBind } from "../decorators/index.js";

export class Item extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private task: TaskModel;

    constructor(hostId: string, task: TaskModel) {
        super(ID_TASK_ITEM_TEMPLATE, hostId, false, task.id);
        this.task = task;

        this.configure();
        this.renderContent();
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.task.title;
        this.element.querySelector('h3')!.textContent = this.task.people.toString();
        this.element.querySelector('p')!.textContent = this.task.description;
    }

    update(): void {}

    @AutoBind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.task.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
    }

}
