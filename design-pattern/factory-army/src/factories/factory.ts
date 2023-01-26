import {UnitType, Unit} from "../units/index.js";

export abstract class Factory {
	buildUnit(type: UnitType): Unit {
		const unite: Unit = this.createUnit(type);
		unite.consumesResources();
		unite.equipMilitary();
		return unite;
	}
	
	public abstract createUnit(type: UnitType): Unit
}
