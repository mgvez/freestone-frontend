//SHARED

import { createSelector } from 'reselect';
import { LASTMODIF_DATE_ALIAS, EDITED_PSEUDOFIELD_ALIAS, PREVIEW_EDITED_PSEUDOFIELD_ALIAS } from '../freestone/schemaProps';

import { getChildrenRecordIds } from './formChildrenRecords';

import { userViewLanguageSelector } from './userViewLanguage';
import { tableSchemaMapStateToProps } from './tableSchema';
import { schemaSelector } from './schema';
import { loadedRecords } from './loadedRecords';

const paramsSelector = (state, props) => props.params || props.match.params || {};
const recordIdSelector = (state, props) => (props.params || props.match.params || {}).recordId;
const recordsSelector = state => state.freestone.recordForm.records;
const isModalSelector = (state, props) => props.isModal;
const childrenSelector = state => state.freestone.schema.children;
const currentPreviewSelector = state => state.freestone.preview.currentPreview;
const defaultLanguageSelector = state => state.freestone.env.freestone.defaultLanguage;

//check si le record ou un de ses enfants a été edité
function getIsEdited(allTables, allChildren, allRecords, tableId, recordId, isForPreview = false) {
	const fieldToCheck = isForPreview ? PREVIEW_EDITED_PSEUDOFIELD_ALIAS : EDITED_PSEUDOFIELD_ALIAS;
	const record = recordId && allRecords[tableId] && allRecords[tableId][recordId];
	if (!record) return false;
	if (record[fieldToCheck]) return true;
	
	const children = [...allChildren[tableId]];
	if (!children) return false;
	return children.reduce((carry, childTableId) => {
		if (carry) return true;
		const childrenRecordIds = getChildrenRecordIds(tableId, recordId, childTableId, allTables, allRecords);
		if (!childrenRecordIds) return false;

		return childrenRecordIds.reduce((isChildEdited, childRecordId) => {
			if (isChildEdited) return true;
			return getIsEdited(allTables, allChildren, allRecords, childTableId, childRecordId, isForPreview);
		}, false);
	}, false);

}

function makeSelector() {
	return createSelector(
		[tableSchemaMapStateToProps(), paramsSelector, recordIdSelector, recordsSelector, isModalSelector, userViewLanguageSelector, defaultLanguageSelector, childrenSelector, schemaSelector, loadedRecords, currentPreviewSelector],
		(table, params, recordId, records, isModal, userViewLanguage, defaultLanguage, allChildren, allSchema, allLoadedRecords, currentPreview) => {
			const record = recordId && table && records[table.id] && records[table.id][recordId];

			//loaded records have a general label for the records, use this as the heading label for the form
			const recordLabel = table && allLoadedRecords && allLoadedRecords.records && allLoadedRecords.records.reduce((carry, tableRecords) => {

				if (tableRecords.table && table.id !== tableRecords.table.id) return carry;
				const candidate = tableRecords.records && tableRecords.records.filter(loadedRecord => {
					return recordId === loadedRecord.id; 
				});
				return candidate && candidate[0] && candidate[0].label;
			}, null);

			//if the current preview is for the current record, we are viewing preview
			const isViewingPreview = table && currentPreview && currentPreview.tableId === table.id && currentPreview.recordId === recordId;
			const hasLanguageToggle = table && table.fields.some((f) => {
				return !!f.language;
			});

			return {
				table,
				params,
				hasLanguageToggle,
				recordLabel,
				isViewingPreview,
				previewType: (isViewingPreview && currentPreview.type) || null,
				lastmodifdate: record && record[LASTMODIF_DATE_ALIAS],
				...userViewLanguage,
				isEdited: getIsEdited(allSchema.tables, allChildren, records, table && table.id, recordId),
				isPreviewEdited: getIsEdited(allSchema.tables, allChildren, records, table && table.id, recordId, true),
			};
		}
	);
}

export function rootFormMapStateToProps() {
	const selectorInst = makeSelector();
	return (state, props) => {
		return selectorInst(state, props);
	};
}
