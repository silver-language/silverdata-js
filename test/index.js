/*
**	index.js
*/

import * as silverData from '../silver-data.js';
import { representation } from '../core/main.js';

async function changeTest() {
	//console.clear();
	const testName = document.forms['test'].testName.value;
	let inputSilver = (await import(`./file/${testName}.agd`, { with: { type:'text' }})).default;
	document.forms['test'].inputSilver.value = inputSilver;

	const testType = document.forms['test'].testType.value;

	const ext = representation[testType].extension;
	console.log(testType,ext);

	let outputTest = (await import(`./file/${testName}.${ext}`, { with: { type:'text' }})).default;
	document.forms['test'].outputTest.value = outputTest;
	update();
}


async function update() {

	let inputSilver = document.forms['test'].inputSilver.value;

	const testType = document.forms['test'].testType.value;


	//let generatedJson = silverData.silverToJSON(inputSilver);
	let generatedJson = representation[testType].method(inputSilver);

	//console.log(generatedJson);
	document.forms['test'].outputGenerated.value = generatedJson;

	let outputTest = document.forms['test'].outputTest.value;
	let testResult = (generatedJson === outputTest);

	document.forms['test'].outputGenerated.dataset.test = (testResult) ? 'pass' : 'fail';

}

document.forms['test']['testName'].addEventListener('change', changeTest);
document.forms['test']['testType'].addEventListener('change', changeTest);
document.forms['test']['inputSilver'].addEventListener('input', update);

changeTest();