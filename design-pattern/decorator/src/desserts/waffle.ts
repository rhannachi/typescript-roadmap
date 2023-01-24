import { Dessert } from "../dessert.js";

export class Waffle extends Dessert {
    constructor() {
        super()
        this.setLabel("Waffle");
        this.setPrice(1.80);
    }
}
