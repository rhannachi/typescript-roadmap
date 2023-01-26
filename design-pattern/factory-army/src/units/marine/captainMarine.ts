import {Unit} from "../unit.js";

export class CaptainMarine extends Unit {
	name = "Captain Marine";
	costBuild = 10;
	accuracyAttack = 3;
	defense = 3;
	equipment = [""]

	constructor() {
		super()
	}
	
	equipMilitary(): void {
		this.equipment.push("Gatling gun");
		this.equipment.push("explosive RDX");
	}
}
