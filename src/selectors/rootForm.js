//SHARED

import { createSelector } from 'reselect';
import { LASTMODIF_DATE_ALIAS, EDITED_PSEUDOFIELD_ALIAS, SLUG_PSEUDOFIELD_ALIAS } from 'freestone/schemaProps';

import { getForeignFieldId, getChildrenRecordIds } from 'freestone/schemaHelpers';

import { userViewLanguageSelector } from 'selectors/userViewLanguage';
import { tableSchemaMapStateToProps } from 'selectors/tableSchema';
import { schemaSelector } from 'selectors/schema';

const recordIdSelector = (state, props) => props.params && props.params.recordId;
const recordsSelector = state => state.recordForm.records;
const isModalSelector = (state, props) => props.isModal;
const childrenSelector = state => state.schema.children;

//check si le record ou un de ses enfants a été edité
function getIsEdited(allTables, allChildren, allRecords, tableId, recordId) {
	const record = recordId && allRecords[tableId] && allRecords[tableId][recordId];
	if (!record) return false;
	if (record[EDITED_PSEUDOFIELD_ALIAS]) return true;

	const children = [...allChildren[tableId]];
	if (!children) return false;

	return children.reduce((carry, childTableId) => {
		if (carry) return true;

		//field id link entre cette table et son parent
		const subformFieldId = getForeignFieldId(childTableId, tableId, allTables);
		const childrenRecordIds = getChildrenRecordIds(allRecords[childTableId], recordId, subformFieldId);
		if (!subformFieldId || !childrenRecordIds) return false;
		// console.log(childTableId);
		// console.log(childrenRecordIds);
		// console.log(subformFieldId);
		return childrenRecordIds.reduce((isChildEdited, childRecordId) => {
			if (isChildEdited) return true;
			return getIsEdited(allTables, allChildren, allRecords, childTableId, childRecordId);
		}, false);
	}, false);

}

function makeSelector() {
	return createSelector(
		[tableSchemaMapStateToProps(), recordIdSelector, recordsSelector, isModalSelector, userViewLanguageSelector, childrenSelector, schemaSelector],
		(schema, recordId, records, isModal, userViewLanguage, allChildren, allSchema) => {
			const { table } = schema;
			const record = recordId && table && records[table.id] && records[table.id][recordId];
			// console.log(allChildren);
			// console.log(records);
			const hasLanguageToggle = table && table.fields.some((f) => {
				return !!f.language;
			});

			return {
				table,
				hasLanguageToggle,
				lastmodifdate: record && record[LASTMODIF_DATE_ALIAS],
				slug: record && record[SLUG_PSEUDOFIELD_ALIAS],
				...userViewLanguage,
				isEdited: getIsEdited(allSchema.tables, allChildren, records, table && table.id, recordId),
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
