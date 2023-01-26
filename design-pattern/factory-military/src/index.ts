interface MilitaryUnit {
    attack(): void;
}

// --------------- units --------------

class Tank implements MilitaryUnit {
    attack() {
        console.log("Tank is attacking!");
    }
}

class Infantry implements MilitaryUnit {
    attack() {
        console.log("Infantry is attacking!");
    }
}

class AirForce implements MilitaryUnit {
    attack() {
        console.log("AirForce is attacking!");
    }
}

// --------------- Factory --------------

abstract class MilitaryUnitFactory {
    static createUnit(type: 'tank' | 'infantry' | 'air-force'): MilitaryUnit {
        switch(type) {
            case "tank":
                return new Tank();
            case "infantry":
                return new Infantry();
            case "air-force":
                return new AirForce();
            default:
                throw new Error("Invalid unit type.");
        }
    }
}

// --------------- Main --------------

const tankUnit = MilitaryUnitFactory.createUnit("tank");
tankUnit.attack();

const infantryUnit = MilitaryUnitFactory.createUnit("infantry");
infantryUnit.attack();

const airForceUnit = MilitaryUnitFactory.createUnit("air-force");
airForceUnit.attack();