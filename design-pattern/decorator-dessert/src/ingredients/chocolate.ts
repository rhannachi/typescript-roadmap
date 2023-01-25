import { DessertDecorator } from "../decorator/dessert.js";
import { Dessert } from "../dessert.js";

export class Chocolate extends DessertDecorator {
    private readonly priceMargin = 0.2

    constructor(d: Dessert) {
        super()
        this.dessert = d;
    }

    getLabel() {
        const label = this.dessert?.getLabel()
        if (label) {
            return `${label}, chocolate`
        }
        return undefined;    }

    getPrice() {
        const price = this.dessert?.getPrice()
        if (!!price) {
            return price + this.priceMargin
        }
        return undefined
    }
}
