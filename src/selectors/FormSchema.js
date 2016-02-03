import { createSelector } from 'reselect';
import { tableSchemaSelector } from 'selectors/TableSchema';
import { fieldsSchemaSelector } from 'selectors/FieldsSchema';

const childrenSelector = state => state.schema.children;

export const formSchemaSelector = createSelector(
	[tableSchemaSelector, fieldsSchemaSelector, childrenSelector],
	(tableSchema, fieldsSchema, unfilteredChildren) => {
		const { table } = tableSchema;
		const { fields } = fieldsSchema;
		const children = table && unfilteredChildren[table.id];
		return {
			table,
			children,
			fields,
		};
	}
);
