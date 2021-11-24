const faker = require("faker");
const utils = require("./utils");
const fs = require("fs");

const adjectivesColor = ["Red", "Blue", "Orange", "Yellow", "Green", "Black", "White", "Purple", "Pink"];
const adjectivesType = ["Jumpy", "Angry", "Stressed", "Funny", "Deadly", "Fast", "Big", "Ready", "Tiny", "Accurate", "Optimal"];
const names = ["Frog", "Beast", "Skeleton", "Bat", "TikiMan", "Zombie", "Fly", "Boar"];

const componentTypes = [
	{ name: "BaseStats", hasChildren: true },
	{ name: "AIStats", hasChildren: true },
	{ name: "OtherStats", hasChildren: true },
	{ name: "RageStats", hasChildren: true },
	{ name: "QualityStats", hasChildren: true },
	{ name: "JumpSpeed", hasChildren: false },
	{ name: "DamageOverTime", hasChildren: false },
	{ name: "JumpDistance", hasChildren: false },
];
const subComponentTypes = {
	OffensiveStats: {
		Power: faker.datatype.number(),
		Mastery: faker.datatype.number(),
		CDR: faker.datatype.number(),
		Haste: faker.datatype.number(),
		Speed: faker.datatype.number(),
	},
	DefensiveStats: {
		Health: faker.datatype.number(),
		Armor: faker.datatype.number(),
		Shield: faker.datatype.number(),
	},
	Accuracy: faker.datatype.number(),
	WanderOffChance: faker.datatype.number(),
	WanderOffDuration: faker.datatype.number(),
	MinIdleTime: faker.datatype.float(),
	MaxIdleTime: faker.datatype.float(),
	MinRoamTime: faker.datatype.float(),
	MaxRoamTime: faker.datatype.float(),
	Position: {
		x: faker.datatype.number(),
		y: faker.datatype.number(),
	},
};

const dataSize = 100;

const data = [];

function generateValue() {
	const componentType = utils.random(componentTypes);
	let name = componentType.name;
	let value;

	if (componentType.hasChildren) {
		value = utils.repeatGenerate(1, 4, () =>
			utils.random(Object.keys(subComponentTypes).map((key) => ({ _id: faker.datatype.uuid(), name: key, value: subComponentTypes[key] })))
		);
	} else {
		value = faker.datatype.number();
	}

	return {
		_id: faker.datatype.uuid(),
		name: name,
		value: value,
	};
}

for (let i = 0; i < dataSize; i++) {
	data.push({
		_id: faker.datatype.uuid(),
		name: `${utils.random(adjectivesColor)}${utils.random(adjectivesType)}${utils.random(names)}`,
		components: utils.repeatGenerate(1, 3, generateValue),
	});
}

fs.writeFileSync("generated.json", JSON.stringify(data));
