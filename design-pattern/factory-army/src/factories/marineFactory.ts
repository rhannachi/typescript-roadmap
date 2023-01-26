import {Factory} from "./factory.js";
import {MajorMarine, UnitType, Unit, CaptainMarine} from "../units/index.js";

export class MarineFactory extends Factory {
	public createUnit(type: UnitType): Unit {
		switch(type) {
			case "major":
				return new MajorMarine()
			case "captain":
				return new CaptainMarine();
			default:
				throw ('Error');
		}
	}
}
