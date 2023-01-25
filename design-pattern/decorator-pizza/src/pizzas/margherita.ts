import {Pizza} from "../pizza.js";

export class MargheritaPizza extends Pizza {
    price = 10;
    getPrice(): number {
        return this.price;
    }
}
