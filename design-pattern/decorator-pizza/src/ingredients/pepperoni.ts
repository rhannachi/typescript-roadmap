import {PizzaDecorator} from "../decorator/pizza.js";

export class PepperoniDecorator extends PizzaDecorator {
    price = 3;
    getPrice(): number {
        return this.pizza.getPrice() + this.price;
    }
}
