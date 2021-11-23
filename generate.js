var faker = require("faker");
var utils = require("./utils");

const adjectives = ["Red", "Blue", "Orange", "Jumpy", "Angry", "Stressed", "Funny", "Deadly", "Fast", "Big", "Ready"];
const names = ["Frog", "Beast", "Skeleton", "Bat", "TikiMan", "Zombie", "Fly", "Boar"];

const componentTypes = ["BaseStats", "AIStats"];
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

const dataSize = 10;

const data = [];

for (let i = 0; i < dataSize; i++) {
	data.push({
		_id: faker.datatype.uuid(),
		name: `${utils.random(adjectives)}${utils.random(adjectives)}${utils.random(names)}`,
		components: utils.repeat(0, 3, {
			_id: faker.datatype.uuid(),
			name: utils.random(componentTypes),
			values: utils.repeat(
				0,
				4,
				Object.keys(subComponentTypes).map((key) => ({ _id: faker.datatype.uuid(), name: key, value: subComponentTypes[key] }))
			),
		}),
	});
}

console.log("data", JSON.stringify(data));
