import { createSelector } from 'reselect';
import { TYPE_MTM, TYPES_PARENT_LINK, TYPE_PRIMARY, TYPE_ORDER } from 'freestone/schemaProps';

//build le schema complet en tree

const tablesSelector = state => state.schema.tables;
const fieldsSelector = state => state.schema.fields;
const fieldDependenciesSelector = state => state.schema.fieldDependencies;
const childrenSelector = state => state.schema.children;


export const schemaSelector = createSelector(
	[tablesSelector, fieldsSelector, fieldDependenciesSelector, childrenSelector],
	(rawTables, fields, fieldDependencies, allChildren) => {
		// console.log('%cBUILD SCHEMA ======', 'font-weight:bold;color:#44ff44;');

		let tables = Object.keys(rawTables).reduce((carry, tableId) => {
			const table = rawTables[tableId];
			carry[tableId] = {
				...table,
				fields: [],
				searchableFields: [],
				fieldDependencies: {},
				prikey: null,
				parentLink: {},
				groupField: null,
				isSelfTree: false,
				hasOrder: false,
				orderField: null,
				mtmOptionField: null,
				hasChildren: !!(allChildren[tableId] && allChildren[tableId].length),
			};
			carry[table.name] = tableId;
			return carry;
		}, {});

		const byName = Object.keys(rawTables).reduce((carry, tableId) => {
			const table = rawTables[tableId];
			carry[table.name] = tableId;
			return carry;
		}, {});

		tables = Object.keys(fields).reduce((carry, fieldId) => {

			const field = fields[fieldId];
			const { table_id } = field;
			const table = carry[table_id];
			table.fields.push(field);

			if (fieldDependencies[fieldId]) {
				table.fieldDependencies[fieldId] = fieldDependencies[fieldId];
			}

			if (field.isSearch) {
				// console.log(field);
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

			if (field.type === TYPE_ORDER) {
				table.hasOrder = true;
				table.orderField = field;
			}
			if (field.type === TYPE_PRIMARY) table.prikey = field;
			if (~TYPES_PARENT_LINK.indexOf(field.type) && field.foreign) {
				table.parentLink[field.foreign.foreignTableId] = field;
			}
			return carry;
		}, tables);
		// console.log(tables);


		Object.keys(tables).forEach((tableId) => {
			const table = tables[tableId];
			if (table.fields) table.fields = table.fields.sort((a, b) => a.rank - b.rank);
			if (table.searchableFields) table.searchableFields = table.searchableFields.sort((a, b) => a.rank - b.rank);

			//if table has many to many field, we need to find the option field
			if (table.type === TYPE_MTM) {
				table.mtmOptionField = table.fields.reduce((carry, field) => {
					if (!carry && !~TYPES_PARENT_LINK.indexOf(field.type) && field.foreign) {
						return field;
					}
					return carry;
				}, null);
			}

		});

		// console.log(tables);
		return {
			tables,
			byName,
		};
	}
);
