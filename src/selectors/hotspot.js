import { createSelector } from 'reselect';

const fieldSelector = state => state.schema.fields;
const fieldIdSelector = (state, props) => props.imageFieldId || (props.field && props.field.hotspot.imageFieldId);
const recordSelector = (state) => state.recordForm.records;
const mainRecordIdSelector = (state, props) => props.parentRecordId;
const valSelector = (state, props) => props.val;

export const hotspotSelector = createSelector(
	[fieldSelector, fieldIdSelector, recordSelector, mainRecordIdSelector, valSelector],
	(fields, fieldId, records, mainRecordId, val) => {
		const tableId = fields[fieldId].table_id;
		const imageId = records[tableId][mainRecordId][fieldId];

		return {
			imageId,
			parsedVal: (val) ? JSON.parse(val) : { x: -1, y: -1 },
		};
	}
);
