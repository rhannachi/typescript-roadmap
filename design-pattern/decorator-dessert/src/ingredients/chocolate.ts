import { DessertDecorator } from "../decorator/dessert.js";
import { Dessert } from "../dessert.js";

export class Chocolate extends DessertDecorator {
    label = "Chocolate"
    price = 0.2

    constructor(d: Dessert) {
        super(d)
    }

    getLabel() {
        const label = this.dessert.getLabel()
        return `${label}, ${this.label}`
    }

    getPrice() {
        return this.dessert.getPrice() + this.price
    }
}
