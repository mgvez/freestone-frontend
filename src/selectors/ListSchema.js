import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

const fieldsSelector = state => state.schema.fields;

export const listSchemaSelector = createSelector(
	[tableSchemaSelector, fieldsSelector],
	(table, fields) => {
		return {
			table,
			searchableFields: Object.keys(fields).map(fieldId => fields[fieldId]).filter(field => {
				return field.isSearch && field.table_id === table.id;
			}),
		};
	}
);
