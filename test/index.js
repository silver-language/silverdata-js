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

	const tests = await loadTests(`assignment/`);

	console.log('tests:',tests);

	document.forms['test']['inputPath'].innerHTML = testSelectOptions(tests);

	document.forms['test']['inputPath'].addEventListener('change', changeInputFile);
	document.forms['test']['testType'].addEventListener('change', changeInputFile);
	document.forms['test']['inputSilver'].addEventListener('input', updateTest);

	//changeInputFile();

}/* documentDOMContentLoaded */



document.addEventListener('DOMContentLoaded', documentDOMContentLoaded);

function testSelectOptions(tests) {
	const options = tests.item.map(
		(item) => `<option value="${tests.path}${item}">${item}</option>`
	);
	const result = `
		<optgroup label="${tests.path}">
			${options.join('')}
		</optgroup>
	`;
	return result;
}



/**
 * @param {string} directoryPath
 * @return {Promise<object>}
 */
async function loadTests(directoryPath) {
	const result = {
		path : directoryPath,
	};

	/** @type Array<string> */
	result.item = await importJson(`${basePath}${directoryPath}_test.json`);
	console.log('loadTests', directoryPath, result);

	// directory.map(
	// 	(item) => {
	// 		if (item.endsWith('/')){
	// 			return
	// 		}
	// 	}
	// );



	return result;
}







/** TestDirectory
 * @typedef {Object} TestDirectory
 * @property {string} path
 * @property {array} TestDirEntry
 */

/** TestDirEntry
 * @typedef {TestDirectory|TestFile} TestDirEntry
 */

/** TestFile
 * @typedef {string} TestFile
 */