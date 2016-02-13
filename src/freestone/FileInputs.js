
const inputs = {};

export function showFileInputs() {
	// console.log(inputs);
	Object.keys(inputs).forEach(k => {
		console.log(k, inputs[k], inputs[k].value);
	});
}

export class SavedFileInput {
	constructor(fId, rId) {
		this.key = `${fId}__${rId}`;
	}

	setInput(input) {
		inputs[this.key] = input;
		showFileInputs();
	}

	getInput() {
		return inputs[this.key];
	}

	deleteInput() {
		inputs[this.key] = null;
	}
}
