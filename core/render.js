/*
**	render.js
*/


// convert various representations into output strings like json, html, md





/*

## export to json without type information - all values get coerced to the 6 json types

	simpleValue = string | number | boolean | null

	value = simpleValue | array | object

	array = [value*]
	object = { name:value* }

## export to json with type information


	silverNode =
	{
		"type": typenameString,
		"value": simpleValue | [silverNode*] | {silverNode*}
	},


*/



export function statement() {

}


/**
 * @param {any} object
 * @returns {string}
 */
export function json(object) {
	return JSON.stringify(object, undefined, '	');
}
