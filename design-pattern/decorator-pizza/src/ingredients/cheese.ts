import {PizzaDecorator} from "../decorator/pizza.js";

export class CheeseDecorator extends PizzaDecorator {
    price = 2;
    getPrice(): number {
        return this.pizza.getPrice() + this.price;
    }
}

