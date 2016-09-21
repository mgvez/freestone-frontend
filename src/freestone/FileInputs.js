import uniqueId from 'utils/UniqueId';
/**
Conserve les nodes des inputs file en mémoire pour pouvoir les poster, il est impossible de les recréer (on ne peut pas mettre dynamiquement une valeur à un input file pour raisons de sécurité
*/


const inputs = {};

export function showFileInputs() {
	// console.log(inputs);
	Object.keys(inputs).forEach(k => {
		console.warn(k, inputs[k], inputs[k].input.value);
	});
}

export function getFileVal(inputKey) {
	const input = inputs[inputKey] && inputs[inputKey].input;
	return input && input.files && input.files[0];
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
		// showfileInputs();
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

	getFile() {
		return getFileVal(this.key);
	}
}

