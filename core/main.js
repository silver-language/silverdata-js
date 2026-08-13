
import * as parse from './parse.js';
import * as json from './json.js';


/**
 *
 */
export const representation = {
	'json' : {
		extension	: 'json',
		method		: silverToJSON,
	},
	'named' : {
		extension	: 'named.json',
		method		: silverToNamed,
	},

	'statement-json' : {
		extension	: 'statement.json',
		method		: statementJSON,
	}
};


/**
 * @param {string} silverData
 * @returns {object}
 */
export function silverToJS(silverData) {
	return {};
}

/**
 * @param {string} silverData
 * @returns {string}
 */
export function silverToJSON(silverData) {

	const sn  = parse.silverToNamed(silverData);

	console.log('sn:',sn);

	let simplified = {};


	for (const [name, item] of Object.entries(sn)) {
		simplified[name] = parse.parseSimple(item.type, item.value);
	}

	const result = json.stringify(simplified);

	return result;
}





/**
 * @param {string} silver
 * @returns {string}
 */
export function silverToNamed(silver) {
	console.log('--silverToNamed--');
	const named = parse.silverToNamed(silver)
	const result = json.stringify(named);
	return result;
}

/**
 * @param {string} silverData
 * @returns {string}
 */
export function statementJSON(silverData) {
	const sd = parse.assignment(silverData);
	const result = json.stringify(sd);
	return result;
}
