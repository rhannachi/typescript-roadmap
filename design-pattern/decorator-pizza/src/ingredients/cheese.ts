import {PizzaDecorator} from "../decorator/pizza.js";
import {Pizza} from "../pizza.js";

export class CheeseDecorator extends PizzaDecorator {
    price = 2;
    constructor(pizza: Pizza) {
        super(pizza)
    }
    getPrice(): number {
        return this.pizza.getPrice() + this.price;
    }
}

