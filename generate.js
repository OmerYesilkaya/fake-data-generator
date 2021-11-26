const faker = require("faker");
const utils = require("./utils");
const fs = require("fs");

let id = 0;
const componentIds = [];
const componentIdsWithChildren = [];

const components = [];
const prefabs = [];
const prefabComponents = [];

const prefabAdjectivesColor = ["Red", "Blue", "Orange", "Yellow", "Green", "Black", "White", "Purple", "Pink"];
const prefabAdjectivesType = ["Jumpy", "Angry", "Stressed", "Funny", "Deadly", "Fast", "Big", "Ready", "Tiny", "Accurate", "Optimal"];
const prefabNames = ["Frog", "Beast", "Skeleton", "Bat", "TikiMan", "Zombie", "Fly", "Boar"];

const componentNamePrefixes = ["Base", "AI", "Rage", "Quality", "Jump", "DamageOverTime"];
const componentNameSuffixes = ["Stats", "Buffer", "Speed", "Distance", "Damage", "Limit", "Range"];
const singleComponentNames = [
	"Power",
	"Mastery",
	"CDR",
	"Haste",
	"Speed",
	"Health",
	"Armor",
	"Shield",
	"Accuracy",
	"WanderOffChance",
	"WanderOffDuration",
	"MinIdleTime",
	"MaxIdleTime",
	"MinRoamTime",
	"MaxRoamTime",
	"Position",
];

const componentAmount = 100;
const prefabAmount = 100;

function generatePrefab() {
	if (componentIds.length === 0 && componentIdsWithChildren.length === 0) return;
	id++;
	const allComponents = [...componentIdsWithChildren, ...componentIds];
	prefabs.push({
		Id: id,
		Name: `${utils.random(prefabAdjectivesColor)}${utils.random(prefabAdjectivesType)}${utils.random(prefabNames)}`,
		Components: utils.repeatGenerate(1, 3, () => utils.random(allComponents)),
	});
}

function generatePrefabComponents() {
	if (prefabs.length === 0) return;
	id++;
	const prefab = utils.random(prefabs);

	const prefabComponents = prefab.Components.map((component) => ({
		PrefabId: prefab.id,
		ComponentId: component,
		Value: faker.datatype.number(100),
	}));

	return prefabComponents;
}

function generateComponent() {
	id++;
	const hasParent = Math.random() > 0.5;
	const hasChildren = Math.random() > 0.5;
	let name;

	if (hasChildren) {
		componentIdsWithChildren.push(id);
		name = utils.random(componentNamePrefixes) + utils.random(componentNameSuffixes);
	} else {
		componentIds.push(id);
		name = utils.random(singleComponentNames);
	}

	return {
		Id: id,
		Name: name,
		Parent: hasParent && componentIdsWithChildren.length > 0 ? utils.random(componentIdsWithChildren) : null,
		Children: hasChildren && componentIds.length > 0 ? utils.repeatGenerate(1, 3, () => utils.random(componentIds)) : null,
	};
}

for (let i = 0; i < componentAmount; i++) {
	components.push(generateComponent());
}

for (let i = 0; i < prefabAmount; i++) {
	prefabComponents.push(generatePrefab());
}

generatePrefabComponents();

fs.writeFileSync("components.json", JSON.stringify(components));
fs.writeFileSync("prefabs.json", JSON.stringify(prefabs));
fs.writeFileSync("prefabComponents.json", JSON.stringify(prefabComponents));
