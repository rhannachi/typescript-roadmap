import { Dessert } from "../dessert.js";

export class Waffle extends Dessert {
    label = 'Waffle'
    price = 1.8
    constructor() {
        super()
        // this.setLabel("Waffle");
        // this.setPrice(1.80);
    }
}
