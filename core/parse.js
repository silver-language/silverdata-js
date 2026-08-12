/*
**	parse.js
// input strings
// return various intermediate representations
*/


const regex = {
	statement	: /^(\w+)\s*:\s*([A-Z]\w+)\s+(.*)$/,
	string		: /^`?(.*)`?$/,
};





/** parse assignment
 * @param {string} string
 * @returns {Statement}
 */
export function assignment(string) {

	const match = string.match(regex.statement);
	console.log(string,match);
	const result = {
		name: match[1],
		type: match[2],
		value: match[3]
	}

	return result;
}

/**
 * @param {Statement} statement
 * @returns {SilverNode}
 */
function statementToNode(statement) {
	const result = {
		type	: statement.type,
		value	: nativeValue(statement.type, statement.value)
	};
	return result;
}







/** parse nativeValue
 * @param {string} type
 * @param {string} value
 * @returns {any}
 */
export function nativeValue(type, value) {

	// totally just a sketch at the moment, will get way worse
	let result;

	switch (type) {
		case 'String':
			result = parseString(value);
			break;
		case 'Number':
			result = parseNumber(value);
			break;
	}


}/* nativeValue */



/** parseString
 * @param {string} string
 * @returns {string}
 */
function parseString(string) {
	return string.replace(regex.string, (match, p1) =>  p1 );
}

/** parseNumber
 * @param {string} string
 * @returns {string}
 */
function parseNumber(string) {
	return string.replace(regex.string, (match, p1) =>  p1 );
}










