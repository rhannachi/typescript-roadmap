/**
 * Record
 */

interface SuperHero {
    name: string,
    power: number,
}

type Name = "BatMan" | "SpiderMan" | "SuperMan"

const heros: Record<Name, SuperHero> = {
    BatMan: {name: 'Batman', power: 70},
    SuperMan: {name: 'Superman', power: 70},
    SpiderMan: {name: 'Spiderman', power: 70}
}

