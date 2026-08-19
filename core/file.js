/*
**	file
*/



/** importFile
 * @param {string} filePath
 * @returns {Promise<string>}
 */
export async function importFile(filePath) {
	//console.log(textImport);
	let result = undefined;

	try {
		const textImport = await import(`${filePath}`, { with: { type:'text' }});
		//console.log(textImport);
		result = textImport.default;
	}
	catch {
		console.log(`importFile: cannot read "${filePath}"`);
	}

	return result;
}/* importFile */



/** importJson
 * @param {string} filePath
 * @returns {Promise<object>}
 */
export async function importJson(filePath) {
	//console.log(textImport);
	let result = undefined;

	try {
		const jsonImport = await import(`${filePath}`, { with: { type:'json' }});
		//console.log('jsonImport',jsonImport);
		result = jsonImport.default;
	}
	catch {
		console.log(`importJson: cannot read "${filePath}"`);
	}

	return result;
}/* importJson */



