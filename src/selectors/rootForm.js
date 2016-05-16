//SHARED

import { createSelector } from 'reselect';

import { LASTMODIF_DATE_ALIAS } from 'freestone/schemaProps';


import { tableSchemaSelector } from 'selectors/tableSchema';
const recordIdSelector = (state, props) => props.params && props.params.recordId;
const recordsSelector = state => state.recordForm.records;


export const rootFormSelector = createSelector(
	[tableSchemaSelector, recordIdSelector, recordsSelector],
	(schema, recordId, records) => {
		const { table } = schema;
		const record = recordId && table && records[table.id] && records[table.id][recordId];
		
		return {
			table,
			lastmodifdate: record && record[LASTMODIF_DATE_ALIAS],
		};
	}
);
