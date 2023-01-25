import { DessertDecorator } from "../decorator/dessert.js";
import { Dessert } from "../dessert.js";

export class WhippedCream extends DessertDecorator {
    label = "Whipped Cream"
    price = 0.5
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

