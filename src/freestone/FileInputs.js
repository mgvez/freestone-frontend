import uniqueId from 'utils/UniqueId';

const inputs = {};

export function showFileInputs() {
	// console.log(inputs);
	Object.keys(inputs).forEach(k => {
		console.log(k, inputs[k], inputs[k].input.value);
	});
}

export class SavedFileInput {
	constructor(val) {
		this.key = (inputs[val] && val) || uniqueId();
	}

	setInput(input, fieldId, recId) {
		this.deleteInput();
		this.key = uniqueId();
		inputs[this.key] = {
			input,
			fieldId,
			recId,
			id: this.key,
		};
		// showFileInputs();
	}

	getInput() {
		// console.log(this.key, inputs[this.key]);
		return inputs[this.key] && inputs[this.key].input;
	}

	getId() {
		return inputs[this.key] && this.key;
	}

	deleteInput() {
		if (inputs[this.key]) delete inputs[this.key];
	}
}


export function getHtmlInput(val) {
	return inputs[val] && inputs[val].input;
}
