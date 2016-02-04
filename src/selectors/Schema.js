import { createSelector } from 'reselect';

//build le schema complet en tree

const tablesSelector = state => state.schema.tables;
const fieldsSelector = state => state.schema.fields;

const PRIMARY_TYPE = 'pri';
const PARENT_LINK_TYPES = ['rel', 'oto', 'mtm'];

export const schemaSelector = createSelector(
	[tablesSelector, fieldsSelector],
	(tables, fields) => {
		console.log('%c build schema', 'font-weight:bold;color:#ff4444;');

		let schema = Object.keys(tables).reduce((carry, tableId) => {
			const table = tables[tableId];
			carry[tableId] = {
				...table,
				fields: [],
				searchableFields: [],
				prikey: null,
				parentLink: null,
			};
			carry[table.name] = tableId;
			return carry;
		}, {});

		schema = Object.keys(fields).reduce((carry, fieldId) => {

			const field = fields[fieldId];
			const { table_id } = field;
			carry[table_id].fields.push(field);

			if (field.isSearch) carry[table_id].searchableFields.push(field);
			if (field.type === PRIMARY_TYPE) carry[table_id].prikey = field;
			if (~PARENT_LINK_TYPES.indexOf(field.type)) carry[table_id].parentLink = field;

			return carry;
		}, schema);
		// console.log(schema);
		return schema;
	}
);
