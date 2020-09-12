import uniqueId from '../utils/UniqueId';
/**
Conserve les nodes des inputs file en mémoire pour pouvoir les poster, il est impossible de les recréer (on ne peut pas mettre dynamiquement une valeur à un input file pour raisons de sécurité
*/

const inputs = {};

export class SavedFileInput {
	constructor(val) {
		this.key = (inputs[val] && val) || uniqueId();
		// console.log('get saved input %s -> %s', val, this.key);
	}

	setInput(input, fieldId, recordId) {
		// console.log('%cchange input', 'color:red;font-weight:bold;');
		this.deleteInput();
		this.key = uniqueId();
		const fileVal = input && input.files && input.files[0];
		const filePath = input && input.value;
		inputs[this.key] = {
			fileVal,
			filePath,
			fieldId,
			recordId,
			id: this.key,
		};
		// showfileInputs();
	}

	setValues(values) {
		inputs[this.key] = inputs[this.key] || {};
		inputs[this.key] = {
			...inputs[this.key],
			...values,
		};
	}

	setCropSettings(cropSettings) {
		this.setValues({ cropSettings });
	}

	getFilePath() {
		// console.log(this.key, inputs[this.key]);
		return inputs[this.key] && inputs[this.key].filePath;
	}

	getId() {
		return inputs[this.key] && this.key;
	}

	getBankItemId() {
		return inputs[this.key] && inputs[this.key].bankItemId;
	}
	setBankItemId(bankItemId) {
		this.setValues({ bankItemId });
	}

	deleteInput() {
		if (inputs[this.key]) delete inputs[this.key];
	}

	getFile() {
		return inputs[this.key] && inputs[this.key].fileVal;
	}

	hasFile() {
		return inputs[this.key] && inputs[this.key].fileVal;
	}

	getCropSettings() {
		return inputs[this.key] && inputs[this.key].cropSettings;
	}
}


export const getSavedInput = (key) => {
	if (inputs[key]) {
		return new SavedFileInput(key);
	}
	return null;
};

export const clearSavedInput = (key) => {
	if (inputs[key]) {
		delete inputs[key];
	}
};
