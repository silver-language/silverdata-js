/*
**	index.js
*/

import * as silverData from '../silver-data.js';
import { importFile, importJson } from '../core/file.js';
import { representation } from '../core/main.js';


const url = new URL(window.location.href);
const basePath = url.pathname.replace('index.html','');


async function changeInputFile() {
	//console.clear();

	const testPath = document.forms['test'].inputPath.value;
	let inputSilver = (await import(`./${testPath}`, { with: { type:'text' }})).default;
	document.forms['test'].inputSilver.value = inputSilver;

	const testType = document.forms['test'].testType.value;

	const ext = representation[testType].extension;
	//console.log(testType,ext);

	const testFilePath = `./${testPath.replace('.agd','')}.${ext}`;

	try {
		const testImport = await import(testFilePath, { with: { type:'text' }});
		//console.log(testImport);

		let outputTest = testImport.default;

		//console.log(outputTest);
		document.forms['test'].outputTest.value = outputTest;
	}
	catch {
		console.log('testfile not found');
		document.forms['test'].outputTest.value = '**testfile not found**';
	}

	updateTest();
}/* changeInputFile */


function updateTest() {

	let inputSilver = document.forms['test'].inputSilver.value;

	const testType = document.forms['test'].testType.value;


	//let generatedJson = silverData.silverToJSON(inputSilver);
	let generatedJson = representation[testType].method(inputSilver);

	//console.log(generatedJson);
	document.forms['test'].outputGenerated.value = generatedJson;

	let outputTest = document.forms['test'].outputTest.value;
	let testResult = (generatedJson === outputTest);

	document.forms['test'].outputGenerated.dataset.test = (testResult) ? 'pass' : 'fail';

}/* updateTest */


async function documentDOMContentLoaded() {



	console.log('basePath',basePath);

	const tests = await loadTestDirectory(`/`);
	//const tests = await loadTestDirectory(`assignment/`);

	flattenTestDirectories(tests);

	console.log('final test dir structure:',tests);




	document.forms['test']['inputPath'].innerHTML = testSelectOptions(tests);

	document.forms['test']['inputPath'].addEventListener('change', changeInputFile);
	document.forms['test']['testType'].addEventListener('change', changeInputFile);
	document.forms['test']['inputSilver'].addEventListener('input', updateTest);

	//changeInputFile();

}/* documentDOMContentLoaded */



document.addEventListener('DOMContentLoaded', documentDOMContentLoaded);


/**
 * @param {TestDirectory} testDirectory
 */
function testSelectOptions(testDirectory) {
	let result;

	const options = testDirectory.item.map(
		(item) => {
			let html;
			// if (typeof item === 'object') {
			// 	html = ``
			// }
			// else {
				html = `<option value="${testDirectory.path}${item}">${item}</option>`;
			//}
			return html;
		}

	);
	result = `
		<optgroup label="${testDirectory.path}">
			${options.join('')}
		</optgroup>
	`;
	return result;
}


/**
 * @param {TestDirectory} testDirectory
 */
function flattenTestDirectories(testDirectory) {

	// take a nested object structure, and return a flattened array of dir objects that have the full path

	console.log('flattenTestDirectories');



}


/** loadTestDirectory
 * @param {string} directoryPath
 * @return {Promise<TestDirectory>}
 */
async function loadTestDirectory(directoryPath) {
	const result = {
		path	: directoryPath,
		item	: []
	};

	/** @type Array<TestDirectoryItem> */
	result.entry = await importJson(`${basePath}${directoryPath}_test.json`);


	// result.entry.forEach(
	// 	(element) => {
	// 		//console.log(element);
	// 		element = 'foo';
	// 	}
	// );

	// result.entry = await result.entry.map(
	// 	(item) => {
	// 		if (item.endsWith('/')) {
	// 			//return "its a dir";
	// 			const subDir = await loadTestDirectory(item);
	// 			return subDir;
	// 		}
	// 		else {
	// 			return item;
	// 		}
	// 	}
	// );


	result.entry = await Array.fromAsync(
		result.entry,
		(item) => {
			if (item.endsWith('/')) {
				//return "its a dir";
				const subDir = loadTestDirectory(item);
				return subDir;
			}
			else {
				return item;
			}
		}
	);


	console.log('--loadTestDirectory', directoryPath, result);

	return result;
}/* loadTestDirectory */







/** TestDirectory
 * @typedef		{Object} 					TestDirectory
 * @property	{string} 					path
 * @property	{Array<TestDirectoryItem>}	item
 */

/** TestDirectoryItem
 * @typedef {TestFile|TestDirectory} TestDirectoryItem
 */

/** TestFile
 * @typedef {string} TestFile
 */