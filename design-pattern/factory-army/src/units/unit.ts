export abstract class Unit {
	protected abstract name: string;
	protected abstract costBuild: number
	protected abstract accuracyAttack: number // precision
	protected abstract defense: number
	protected abstract equipment: Array<string>
	
	consumesResources(): void {
		console.log(`Consumes ${this.costBuild} resources for the creation of the ${this.name} unit.`)
	}
	
	abstract equipMilitary(): void;
	
	information(): string {
		let str = `Name: ${this.name} | `;
		str += `Building cost: ${this.costBuild} | `
		str += `Attack Accuracy: ${this.accuracyAttack} | `
		str += `Defense: ${this.defense} | `;
		str += "Equipment: "
		for (const item of this.equipment) {
			str += `${item}, `
		}
		return str;
	}
}

const UNIT = ['major', 'captain'] as const
export type UnitType = typeof UNIT[number]
