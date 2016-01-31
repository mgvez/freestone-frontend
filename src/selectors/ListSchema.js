import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

const fieldsSelector = state => state.schema.fields;

export const listSchemaSelector = createSelector(
	[tableSchemaSelector, fieldsSelector],
	(tableSchema, fields) => {
		const { table } = tableSchema;
		return {
			table,
			searchableFields: Object.keys(fields).map(fieldId => fields[fieldId]).filter(field => {
				return table && field.isSearch && field.table_id === table.id;
			}),
		};
	}
);
