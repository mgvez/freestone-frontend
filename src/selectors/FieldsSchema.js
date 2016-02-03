import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';

//get les fields de la table du component (settée par tableId ou tableName)

const fieldsSelector = state => state.schema.fields;

export const fieldsSchemaSelector = createSelector(
	[tableSchemaSelector, fieldsSelector],
	(tableSchema, fields) => {
		const { table } = tableSchema;
		return {
			fields: Object.keys(fields).map(fieldId => fields[fieldId]).filter(field => {
				return table && field.table_id === table.id;
			}),
		};
	}
);
