import {Factory} from "./factory.js";
import {MajorAirForce, UnitType, Unit, CaptainAirForce} from "../units/index.js";

export class AirForceFactory extends Factory {
	createUnit(type: UnitType): Unit {
		switch(type) {
			case "major":
				return new MajorAirForce()
			case "captain":
				return new CaptainAirForce()
			default:
				throw ("Error")
		}
	}
}
