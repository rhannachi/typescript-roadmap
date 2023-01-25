import {PizzaDecorator} from "../decorator/pizza.js";
import {Pizza} from "../pizza.js";

export class PepperoniDecorator extends PizzaDecorator {
    price = 3;

    constructor(pizza: Pizza) {
        super(pizza)
    }
    getPrice(): number {
        return this.pizza.getPrice() + this.price;
    }
}
