import { Observer } from "./observer.js";

export class Subject<T extends { id: string }> {
    private observers: Observer<T>[] = [];
    private state: T[] = [];

    getState() {
        return this.state;
    }

    addObjectToState(object: T) {
        this.state.push(object)
        this.notifyAllObservers()
    }

    setObjectFromState(id: string, newObject:T) {
        this.state = this.state.map((object) => {
            if (object.id === id){
                return newObject
            }
            return object
        })
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

