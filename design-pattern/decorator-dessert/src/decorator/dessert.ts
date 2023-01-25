import { Dessert } from "../dessert.js";

export abstract class DessertDecorator extends Dessert {
    protected dessert: Dessert
    protected constructor(dessert: Dessert) {
        super()
        this.dessert = dessert;
    }
    abstract getLabel(): string
    abstract getPrice(): number
}


