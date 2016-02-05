import { createSelector } from 'reselect';

//build le schema complet en tree

const tablesSelector = state => state.schema.tables;
const fieldsSelector = state => state.schema.fields;

const PRIMARY_TYPE = 'pri';
const ORDER_TYPE = 'order';
const PARENT_LINK_TYPES = ['rel', 'oto', 'mtm'];

export const schemaSelector = createSelector(
	[tablesSelector, fieldsSelector],
	(tables, fields) => {
		console.log('%cBUILD SCHEMA ======', 'font-weight:bold;color:#44ff44;');

		let schema = Object.keys(tables).reduce((carry, tableId) => {
			const table = tables[tableId];
			carry[tableId] = {
				...table,
				fields: [],
				searchableFields: [],
				prikey: null,
				parentLink: null,
				groupField: null,
				isSelfTree: false,
				hasOrder: false,
			};
			carry[table.name] = tableId;
			return carry;
		}, {});

		schema = Object.keys(fields).reduce((carry, fieldId) => {

			const field = fields[fieldId];
			const { table_id } = field;
			const table = carry[table_id];
			table.fields.push(field);

			if (field.isSearch) {
				
				if (field.isGroup) {
					table.groupField = field;
					//self join? si oui, affiche le tree
					if (field.foreign && table_id === field.foreign.foreignTableId) {
						table.isSelfTree = true;
					}
				} else {
					table.searchableFields.push(field);
				}
				
			}
			if (field.type === ORDER_TYPE) {
				table.hasOrder = true;
			}
			if (field.type === PRIMARY_TYPE) table.prikey = field;
			if (~PARENT_LINK_TYPES.indexOf(field.type)) table.parentLink = field;

			return carry;
		}, schema);

		Object.keys(schema).map((tableId) => {
			const table = schema[tableId];
			if (table.fields) table.fields = table.fields.sort((a, b) => a.rank > b.rank);
		});

		// console.log(schema);
		return schema;
	}
);
