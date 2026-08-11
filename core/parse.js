/*
**	parse.js
// input strings
// return various intermediate representations
*/





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












