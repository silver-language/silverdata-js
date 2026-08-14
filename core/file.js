/*
**	file
*/



/** readFileContent
 * @param {string} filePath
 * @returns {Promise<string>}
 */
export async function readFileContent(filePath) {

	let result = undefined;

	try {
		const textImport = await import(`./${filePath}`, { with: { type:'text' }});
		//console.log(textImport);
		result = textImport.default;
	}
	catch {
		console.log(`readFileContent: cannot read "${filePath}"`);
	}

	return result;
}/* readFileContent */