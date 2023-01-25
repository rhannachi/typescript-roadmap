import {Unit} from "../unit.js";

export class CaptainAirForce extends Unit {
	name = "Captain AirForce";
	costBuild = 14;
	accuracyAttack = 5;
	defense = 2;
	equipment = [""]

	constructor() {
		super()
	}
	
	equipMilitary(): void {
		this.equipment.push("Sub-machine gun");
		this.equipment.push("Pistol");
	}
}
