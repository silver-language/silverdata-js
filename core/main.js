
import * as parse from './parse.js';
import * as render from './render.js';


export const fileExtension = {
	'json'				: 'json',
	'json-with-types'	: 'typed.json',
	'statement-json'	: 'statement.json'
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
	const result = render.json(sd);
	return result;
}

