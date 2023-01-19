import { Observer } from "../observers/index.js";
import { TaskModel } from "../models/index.js";

export abstract class Component<T extends HTMLElement, U extends HTMLElement> extends Observer<TaskModel>{
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    protected constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        super()
        this.templateElement = <HTMLTemplateElement>document.getElementById(templateId);
        this.element = <U>document.importNode(this.templateElement.content,true).firstElementChild
        if (newElementId) {
            this.element.id = newElementId;
        }

        this.hostElement = <T>document.getElementById(hostElementId);
        this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}
