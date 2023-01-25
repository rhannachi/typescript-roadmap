import {Pizza} from "../pizza.js";

export abstract class PizzaDecorator extends Pizza {
    protected pizza: Pizza;
    constructor(pizza: Pizza) {
        super()
        this.pizza = pizza;
    }

    getPrice(): number {
        return this.pizza.getPrice();
    }
}