import {Unit} from "../unit.js";

export class MajorAirForce extends Unit {
	name = "Major AirForce";
	costBuild = 5;
	accuracyAttack = 1;
	defense = 2;
	equipment = [""]

	constructor() {
		super()
	}
	
	equipMilitary(): void {
		this.equipment.push("Carbine");
		this.equipment.push("RPG");
	}
}
