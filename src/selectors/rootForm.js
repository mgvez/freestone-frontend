//SHARED

import { createSelector } from 'reselect';
import { LASTMODIF_DATE_ALIAS } from 'freestone/schemaProps';

import { userViewLanguageSelector } from 'selectors/userViewLanguage';
import { tableSchemaMapStateToProps } from 'selectors/tableSchema';

const recordIdSelector = (state, props) => props.params && props.params.recordId;
const recordsSelector = state => state.recordForm.records;
const isModalSelector = (state, props) => props.isModal;

function makeSelector() {
	return createSelector(
		[tableSchemaMapStateToProps(), recordIdSelector, recordsSelector, isModalSelector, userViewLanguageSelector],
		(schema, recordId, records, isModal, userViewLanguage) => {
			const { table } = schema;
			const record = recordId && table && records[table.id] && records[table.id][recordId];
			
			const hasLanguageToggle = table && table.fields.some((f) => {
				return !!f.language;
			});

			return {
				table,
				hasLanguageToggle,
				lastmodifdate: record && record[LASTMODIF_DATE_ALIAS],
				...userViewLanguage,
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
