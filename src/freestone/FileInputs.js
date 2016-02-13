
const inputs = {};

const key = (t, r) => `${t}__${r}`;

export default {
	setInput(tableId, recordId, input) {
		inputs[k(tableId, recordId)] = input;
	},

	getInput(tableId, recordId) {
		return inputs[k(tableId, recordId)];
	}

	deleteInput(tableId, recordId) {
		inputs[k(tableId, recordId)] = null;
	}

}