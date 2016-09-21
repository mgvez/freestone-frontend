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
	return inputs[inputKey] && inputs[inputKey].fileVal;
}

export class SavedFileInput {
	constructor(val) {
		this.key = (inputs[val] && val) || uniqueId();
		// console.log('get saved input %s -> %s', val, this.key);
	}

	setInput(input, fieldId, recId) {
		// console.log('%cchange input', 'color:red;font-weight:bold;');
		this.deleteInput();
		this.key = uniqueId();
		const fileVal = input && input.files && input.files[0];
		const filePath = input && input.value;
		inputs[this.key] = {
			fileVal,
			filePath,
			fieldId,
			recId,
			id: this.key,
		};
		// showfileInputs();
	}

	getFilePath() {
		// console.log(this.key, inputs[this.key]);
		return inputs[this.key] && inputs[this.key].filePath;
	}

	getId() {
		return inputs[this.key] && this.key;
	}

	deleteInput() {
		if (inputs[this.key]) delete inputs[this.key];
	}

	getFile() {
		return inputs[this.key] && inputs[this.key].fileVal;
	}
}

