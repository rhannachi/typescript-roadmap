
import {MargheritaPizza} from "./pizzas/margherita.js";
import {PepperoniDecorator, CheeseDecorator} from "./ingredients/index.js";

const margheritaPizza = new MargheritaPizza();
console.log(`Prix de la pizza Margherita : ${margheritaPizza.getPrice()}€`);

const cheeseMargheritaPizza = new CheeseDecorator(margheritaPizza);
console.log(`Prix de la pizza Margherita avec extra fromage : ${cheeseMargheritaPizza.getPrice()}€`);

const pepperoniMargheritaPizza = new PepperoniDecorator(cheeseMargheritaPizza);
console.log(`Prix de la pizza Margherita avec extra fromage et pepperoni : ${pepperoniMargheritaPizza.getPrice()}€`);
