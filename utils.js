/**
 * Returns a random integer between given values.
 * @function
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomBetweenInts(min, max) {
	return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
}

/**
 * Returns an array with {random(min,max)} amount of elements with given value.
 * @function
 * @param {number} min
 * @param {number} max
 * @param {any} value
 * @returns {[any]}
 */

function repeat(min, max, value) {
	let result = [];
	const times = randomBetweenInts(min, max);
	for (let i = 0; i < times; i++) {
		result.push(value);
	}
	return result;
}

let generatedVal;
function generateWithoutDuplicate(val, generator) {
	if (generatedVal === val) {
		val = generator();
	}
}

function repeatGenerate(min, max, generate) {
	let result = [];
	const times = randomBetweenInts(min, max);
	for (let i = 0; i < times; i++) {
		let val = generate();
		if (val === generatedVal) {
			val = generate();
		}
		generatedVal = val;

		result.push(val);
	}
	return result;
}

/**
 * Returns an array with {random(min,max)} amount of elements with given value.
 * @function
 * @param {[any]} array
 * @returns {any}
 */

function random(array) {
	const min = 0;
	const max = array.length;
	const index = randomBetweenInts(min, max);
	return array[index];
}

module.exports = { random, repeat, randomBetweenInts, repeatGenerate };
