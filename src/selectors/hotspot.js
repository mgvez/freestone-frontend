import { createSelector } from 'reselect';

const fieldSelector = state => state.schema.fields;
const fieldIdSelector = (state, props) => props.imageFieldId;
const recordSelector = (state) => state.recordForm.records;
const mainRecordIdSelector = (state, props) => props.parentRecordId;

export const hotspotSelector = createSelector(
	[fieldSelector, fieldIdSelector, recordSelector, mainRecordIdSelector],
	(fields, fieldId, records, mainRecordId) => {
		const tableId = fields[fieldId].table_id;
		const imageId = records[tableId][mainRecordId][fieldId];

		return {
			imageId,
		};
	}
);
