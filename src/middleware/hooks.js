import { RECEIVE_RECORD } from 'actions/record';

export default store => next => action => {// eslint-disable-line

	if (action.type === RECEIVE_RECORD) {
		const hook = window.freestone && window.freestone.hooks && window.freestone.hooks.getFieldValue;
		if (hook) {
			action.data.tables = action.data.tables.map((table) => {
				table.records = table.records.map((record) => {
					// console.log(record);
					return Object.keys(record).reduce((tmpRec, fieldId) => {
						tmpRec[fieldId] = hook(fieldId, tmpRec[fieldId]);
						// console.log(fieldId, tmpRec[fieldId]);
						return tmpRec;
					}, { ...record });
				});
				return table;
			});
			// console.log(action);
		}
	}

	return next(action);
};
