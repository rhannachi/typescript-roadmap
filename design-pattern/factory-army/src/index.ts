import {MarineFactory, Factory, AirForceFactory} from "./factories/index.js";
import {Unit} from "./units/index.js";

// ---------- Create units of type Marine ---------
const factoryMarine: Factory = new MarineFactory();
const unite1: Unit = factoryMarine.buildUnit("captain");
const unite2: Unit = factoryMarine.buildUnit("major");
console.log({ unite1 })
console.log({ unite2 })

console.log("")

// ---------- Create units of type AirForce ---------
const airForceFactory: Factory = new AirForceFactory();
const unite3: Unit = airForceFactory.buildUnit("captain");
const unite4: Unit = airForceFactory.buildUnit("major");
console.log({ unite3 })
console.log({ unite4 })

