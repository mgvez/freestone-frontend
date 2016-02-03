import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

const fieldsSelector = state => state.schema.fields;

export const fieldsSearchableSelector = createSelector(
	[tableSchemaSelector, fieldsSelector],
	(tableSchema, fields) => {
		const { table } = tableSchema;
		return {
			fieldsSearchable: Object.keys(fields).map(fieldId => fields[fieldId]).filter(field => {
				return table && field.isSearch && field.table_id === table.id;
			}),
		};
	}
);
