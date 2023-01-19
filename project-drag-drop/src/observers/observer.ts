import { Subject } from "./subject.js";


export abstract class Observer<T extends object> {
    protected subject: Subject<T> = new Subject<T>();
    abstract update(): void
}
