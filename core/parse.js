/*
**	parse.js
// input strings
// return various intermediate representations
*/


const regex = {
	statement		: /^(\w+)\s*:\s*([A-Z]\w+)\s+(.*)$/,
	stringUnwrap	: /^`(.*)`$/,
};





/** parse assignment
 * @param {string} string
 * @returns {Statement}
 */
export function assignment(string) {

	const match = string.match(regex.statement);
	//console.log(string,match);
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
		value	: parseSimple(statement.type, statement.value)
	};
	return result;
}


/**
 * @param {string} silver
 * @returns {object}
 */
export function silverToNamed(silver) {
	const sd = assignment(silver);
	let result = {};
	result[sd.name] = {
		type	: sd.type,
		value	: sd.value,
	};

	return result;
}



/** parseSimple
 * @param {string} type
 * @param {string} value
 * @returns {any}
 */
export function parseSimple(type, value) {
	// totally just a sketch at the moment, will get way worse
	let result = unwrapString(value);
	if (parseMap[type]) result = parseMap[type](result);

	return result;
}/* parseSimple */



/** unwrapString
 * @param {string} string
 * @returns {string}
 */
function unwrapString(string) {
	return string.replace(regex.stringUnwrap, (match, p1) =>  p1 );
}



const parseMap = {
	'String'	: parseString,
	'Number'	: parseNumber,
	'Integer'	: parseInteger,
	'Boolean'	: parseBoolean,
	'Null'		: parseNull
};


/** parseString
 * @param {string} string
 * @returns {string}
 */
function parseString(string) {
	return String(string);
}

/** parseNumber
 * @param {string} string
 * @returns {number}
 */
function parseNumber(string) {
	return Number(string);
}

/** parseInteger
 * @param {string} string
 * @returns {number}
 */
function parseInteger(string) {
	return Number.parseInt(string);
}

/** parseBoolean
 * @param {string} string
 * @returns {boolean}
 */
function parseBoolean(string) {
	return Boolean(string);
}

/** parseNull
 * @param {string} string
 * @returns {boolean}
 */
function parseNull(string) {
	return null;
}