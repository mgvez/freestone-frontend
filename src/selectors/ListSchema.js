import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';
import { fieldsSearchableSelector } from 'selectors/FieldsSearchable';


export const listSchemaSelector = createSelector(
	[tableSchemaSelector, fieldsSearchableSelector],
	(tableSchema, fieldsSearchableSchema) => {
		const { table } = tableSchema;
		const { fieldsSearchable } = fieldsSearchableSchema;
		return {
			table,
			fieldsSearchable,
		};
	}
);
