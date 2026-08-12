
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
		method		: silverToJSON,
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
	const sd = parse.assignment(silverData);
	const result = json.stringify(sd);
	return result;
}


/**
 * @param {string} silver
 * @param {string} silver
 * @returns {string}
 */
export function silverToNamed(silver) {
	console.log('--silverToNamed--');
	const sd = parse.assignment(silver);
	const named = {};
	named[sd.name] = {
		type	: sd.type,
		value	: sd.value,
	};
	const result = json.stringify(named);
	return result;
}

