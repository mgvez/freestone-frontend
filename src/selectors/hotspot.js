import { createSelector } from 'reselect';

import { bankImageItemsSelector } from '../selectors/bank';

const fieldSelector = state => state.freestone.schema.fields;
const fieldIdSelector = (state, props) => props.imageFieldId || (props.field && props.field.hotspot.imageFieldId);
const recordSelector = (state) => state.freestone.recordForm.records;
const mainRecordIdSelector = (state, props) => props.parentRecordId;
const valSelector = (state, props) => props.val;

export const hotspotImageIdSelector = createSelector([
	fieldSelector, fieldIdSelector, recordSelector, mainRecordIdSelector, 
], (fields, fieldId, records, mainRecordId) => {
	const tableId = fields && fields[fieldId] && fields[fieldId].table_id;
	return records[tableId] && records[tableId][mainRecordId] && records[tableId][mainRecordId][fieldId];
});

export const hotspotSelector = createSelector(
	[valSelector, hotspotImageIdSelector, bankImageItemsSelector],
	(val, hotspotImageId, imageItems) => {
		return {
			imageBankItem: imageItems && hotspotImageId && imageItems[hotspotImageId],
			parsedVal: (val) ? JSON.parse(val) : { x: -1, y: -1 },
		};
	}
);
