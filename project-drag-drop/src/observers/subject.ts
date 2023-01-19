import { Observer } from "./observer.js";

export class Subject<T extends object> {
    private observers: Observer<T>[] = [];
    private state: T[] = [];

    getState() {
        return this.state;
    }

    setState(project: T) {
        this.state = [...this.state, project];
        this.notifyAllObservers()
    }

    notifyAllObservers() {
        for (const observer of this.observers) {
            observer.update();
        }
    }

    attach(observer: Observer<T>){
        this.observers.push(observer)
    }

}

