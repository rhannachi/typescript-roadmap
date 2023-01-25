import {Unit} from "../unit.js";

export class MajorMarine extends Unit {
	name = "Major Marine";
	costBuild = 6;
	accuracyAttack = 2;
	defense = 1;
	equipment = [""]
	constructor() {
		super()
	}
	
	equipMilitary(): void {
		this.equipment.push("bazooka");
		this.equipment.push("air gun");
	}
}
