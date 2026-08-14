/*
**	index.js
*/

import * as silverData from '../silver-data.js';
import { readFileContent } from '../core/file.js';
import { representation } from '../core/main.js';

async function changeInputFile() {
	//console.clear();

	const testPath = document.forms['test'].inputPath.value;
	let inputSilver = (await import(`./${testPath}.agd`, { with: { type:'text' }})).default;
	document.forms['test'].inputSilver.value = inputSilver;

	const testType = document.forms['test'].testType.value;

	const ext = representation[testType].extension;
	//console.log(testType,ext);

	const inputFilePath = `./${testPath}.${ext}`;

	try {
		const testImport = await import(`./${testPath}.${ext}`, { with: { type:'text' }});
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


function documentDOMContentLoaded() {

	document.forms['test']['inputPath'].addEventListener('change', changeInputFile);
	document.forms['test']['testType'].addEventListener('change', changeInputFile);
	document.forms['test']['inputSilver'].addEventListener('input', updateTest);

	changeInputFile();

}/* documentDOMContentLoaded */

document.addEventListener('DOMContentLoaded', documentDOMContentLoaded);