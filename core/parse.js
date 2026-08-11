/*
**	parse.js
*/


// input strings
// return various intermediate representations


const statement = /^(\w+)\s*:\s*([A-Z]\w+)\s+(.*)$/;



/** parse assignment
 * @param {string} string
 * @returns {Statement}
 */
export function assignment(string) {

	const match = string.match(statement);
	console.log(string,match);
	const result = {
		name: match[1],
		type: match[2],
		value: match[3]
	}

	return result;
}








/** SilverNode
 * @typedef {Object} SilverNode
 * @property {string} type
 * @property {array|object|SimpleValue} value
 */

/** SimpleValue
 * @typedef {string|number|boolean|null} SimpleValue
 */


/** Statement
 * @typedef {Object} Statement
 * @property {string} name
 * @property {string} type
 * @property {string} value
 */