import { Dessert } from "../dessert.js";

export abstract class Ingredient extends Dessert {
    protected dessert?: Dessert
    abstract getLabel(): string | undefined
    abstract getPrice(): number | undefined
}


