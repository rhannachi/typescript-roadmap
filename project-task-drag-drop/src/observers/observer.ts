import { Subject } from "./subject.js";

export abstract class Observer<T extends { id: string }> {
    protected subject: Subject<T> = new Subject<T>();
    abstract update(): void
}
