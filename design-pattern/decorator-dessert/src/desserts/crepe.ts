import { Dessert } from "../dessert.js";

export class Crepe extends Dessert {
    constructor() {
        super()
        this.setLabel("Crepe");
        this.setPrice(1.50);
    }
}

