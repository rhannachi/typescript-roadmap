import { Crepe, Waffle } from "./desserts/index.js";
import { Chocolate, WhippedCream } from "./ingredients/index.js";

/**
 * Waffle + Chocolate
 */

const waffle = new Waffle();
const waffleChocolate = new Chocolate(waffle);
console.log({ 'dessert 1': waffleChocolate.Information() });

/**
 * Crepe + Chocolate + whipped cream
 */

const crepe = new Crepe();
const crepeChocolate = new Chocolate(crepe);
const crepeChocolateWhippedCream = new WhippedCream(crepeChocolate);
console.log({ 'dessert 2': crepeChocolateWhippedCream.Information() });

